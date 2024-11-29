function validNumber(number) {
	return typeof number === 'number' && isFinite(number)
}

function getNumberAbove100() {
	let attempts = 10
	let lastInput = null

	while (attempts > 0) {
		const input = prompt('Enter number > 100')
		if (input === null) break // User cancels

		const number = Number(input)

		if (isNaN(number)) {
			lastInput = input
			console.log(`Last input: ${lastInput}`)
			break
		}

		lastInput = number

		if (validNumber(number) && number > 100) {
			console.log(`Last input: ${lastInput}`)
			break
		} else {
			alert('Your number is less than 100. Try again!')
		}

		attempts--
	}

	if (attempts === 0) console.log(`Last input: ${lastInput}`)
}

getNumberAbove100()