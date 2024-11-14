const numbers = prompt('Enter your three-digit number');

if (!isNaN(numbers) && numbers.length === 3){
    numbers[0] === numbers[1] && numbers[1] === numbers[2]
		? console.log('All numbers are the same')
		: console.log('Not all numbers are the same');

    if (numbers[0] === numbers[1] || numbers[0] === numbers[2] || numbers[1] === numbers[2]) console.log('There are the same numbers');
} else {
    alert('You dont enter three-digit number');
}