let testStarted = false
let startTime = null
let finishTime = null
let timer = null

const clickarea = document.querySelector('.clickarea')
const message = document.querySelector('.message')
const note = document.querySelector('.note')

const randomNumber = (min, max, int = false) => {
	return (int)
		? Math.floor(Math.random() * (max - min + 1)) + min
		: Math.random() * (max - min) + min
}

const turnGreen = () => {
	clickarea.classList.remove('red')
	clickarea.classList.add('green')
	message.textContent = 'Click!'
}

const handleClick = () => {
	if (!testStarted) {
		const msUntilGreen = randomNumber(2, 4)
		startTime = new Date()
		finishTime = new Date(startTime.getTime() + (msUntilGreen * 1000))

		clickarea.classList.add('red')
		message.textContent = 'Wait for green...'
		note.textContent = ''
		testStarted = true

		timer = setTimeout(turnGreen, msUntilGreen * 1000)
	} else {
		testStarted = false

		if (new Date() < finishTime) {
			clearTimeout(timer)
			clickarea.classList.remove('red')
			message.textContent = 'Too soon!'
		} else {
			clickarea.classList.remove('green')
			message.textContent = `${new Date() - finishTime}ms`
			note.textContent = 'Click to keep going'
		}
	}
}

clickarea.addEventListener('mousedown', handleClick)
