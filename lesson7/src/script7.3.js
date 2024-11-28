function validNumber(number) {
	return typeof number === 'number' && isFinite(number);
}

function getNumberAbove100() {
	let i = 0;
	let lastInput = null;
	while (i < 10) {
		const input = prompt('Enter number > 100')
        if(input === null) return;

        if(isNaN(input)) {
            lastInput = input;
			return console.log(`Last input: ${lastInput}`);
        }

		const number = Number(input);
        lastInput = number

		if (validNumber(number) && number > 100 && number !== '') {
			lastInput = number
			return console.log(`Last input: ${lastInput}`);
		} else {
			if (!confirm('Your number < 100, try again pls!')) return
		}
		i++
	}
    console.log(`Last input: ${lastInput}`);
}

getNumberAbove100()
