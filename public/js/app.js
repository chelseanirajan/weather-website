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
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'Current Date/Time: '+ data.forcast.locationTime + ' ' + '\n'+
                    'It is '+ data.forcast.temperature + 'Celcius and humidity is '+data.forcast.humidity +'\n'
                  + ' Location is ' + data.location;
                // console.log(data.location)
                // console.log(data.forcast)
            }
        })
    })
})
