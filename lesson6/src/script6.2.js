function avgArray(array) {
    let sumArray = 0;
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        if (isFinite(array[i])) {
            sumArray += Number(array[i]);
            count++;
        }
    }
    
	return count > 0 ? sumArray / count : 0;
}

function validArray(array) {
	if (!array) {
		return alert('You enter wrong array!'), false;
	} else {
		return true;
	}
}

do {
	const userArray = prompt('Enter your array', 'exampl, exampl2, ...');
    let newArray = '';

	if (!validArray(userArray)) {
		if (!confirm('You want try again?')) break;
	} else {
        newArray = userArray.trim();
        newArray = newArray.split(/,\s*/);
		alert(`Avg: ${avgArray(newArray)}`);
	}
} while (true)