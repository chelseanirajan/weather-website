console.log('client side javascript file is loading!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=Nepal').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forcast)
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'javascriopat'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchLocation.value;
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location +' '+ data.forcast.latitude+', '+ data.forcast.longitude;
                // console.log(data.location)
                // console.log(data.forcast)
            }
        })
    })
})
