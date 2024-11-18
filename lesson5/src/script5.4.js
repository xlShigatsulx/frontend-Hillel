do {
	const N = parseInt(prompt('Enter N'));
    let flag = true;

	if (!N || isNaN(N)) {
		alert('You enter wrong N!');
		if (!confirm('You want try again?')) break;
	} else {
		if (!Number.isInteger(N)) {
			alert('You enter wrong N!');
		} else {
            if(N > 1){
                for(let i = 2; i < N; i++){
                    if (N % i === 0) {
                        flag = false;
                        break;
                    }
                }
            } else {
                flag = false;
            }
            flag
                ? alert(`Number: ${N}, is a prime number`)
                : alert(`Number: ${N}, is not a prime number`);
		}
		if (!confirm('You want try again?')) break;
	}
} while (true);