const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherform.addEventListener('submit', (e) => {
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	e.preventDefault()
	const location = search.value
	fetch('http://localhost:3000/weather?address=' + location).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				messageTwo.textContent = data.error
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})
