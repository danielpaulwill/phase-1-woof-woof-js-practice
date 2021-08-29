document.addEventListener('DOMContentLoaded', e => {
  let dogDiv = document.getElementById('dog-bar')
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(data => {
    data.forEach(dog => {
      let dogSpan = document.createElement('span')
      dogSpan.innerText = `${dog.name}`
      dogSpan.id = `${dog.name}`
      dogDiv.append(dogSpan)
      dogSpan.addEventListener('click', e => {
        let dogInfo = document.getElementById('dog-info')
        dogInfo.innerHTML = ''
        let dogImage = document.createElement('img')
        dogImage.src = `${dog.image}`
        let dogName = document.createElement('h2')
        dogName.innerText = `${dog.name}`
        let dogButton = document.createElement('button')
        dogButtonFunc(dog, dogButton)
        dogButton.addEventListener('click', e => {
        dogGoodSwitch(dog, dogButton)
            
        })
        dogInfo.append(dogImage)
        dogInfo.append(dogName)
        dogInfo.append(dogButton)
      })
    })
  })
});

function dogGoodSwitch(dog, dogButton) {
  dog.isGoodDog = !dog.isGoodDog
  fetch(`http://localhost:3000/pups/${dog.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
            },
              body: JSON.stringify({
                'isGoodDog': dog.isGoodDog
              })
          })
            .then(res => res.json())
            .then(dog => {
              dogButtonFunc(dog, dogButton)
            })
  
}

function dogButtonFunc(dog, dogButton) {
  if (dog.isGoodDog === true) {
    dogButton.innerText = 'Good Dog!'
  } else if (dog.isGoodDog === false) {
    dogButton.innerText = 'Bad Dog!'
  }
  return dogButton.innerText
};




