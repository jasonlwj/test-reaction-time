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

const updateText = (messageText, noteText) => {
	message.textContent = messageText
	note.textContent = noteText
}

const handleClick = event => {
	event.preventDefault()
	event.stopPropagation()
	
	if (!testStarted) {
		const msUntilGreen = randomNumber(2, 4)
		startTime = new Date()
		finishTime = new Date(startTime.getTime() + (msUntilGreen * 1000))

		clickarea.classList.add('red')
		updateText('Wait for green...', '')
		testStarted = true

		timer = setTimeout(() => {
			clickarea.classList.remove('red')
			clickarea.classList.add('green')
			message.textContent = 'Click!'
		}, msUntilGreen * 1000)
	} else {
		testStarted = false

		if (new Date() < finishTime) {
			clearTimeout(timer)
			clickarea.classList.remove('red')
			updateText('Too soon!', 'Click to try again')
			
		} else {
			clickarea.classList.remove('green')
			updateText(`${new Date() - finishTime}ms`, 'Click to keep going')
		}
	}
}

clickarea.addEventListener('mousedown', handleClick)
clickarea.addEventListener('touchstart', handleClick)
