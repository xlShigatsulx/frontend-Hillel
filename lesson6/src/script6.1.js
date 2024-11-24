function delSymbol (string, symbol){
    let newString = '';

    for (let i = 0; i < string.length; i++) {
        if (!symbol.includes(string[i])) newString += string[i];
    }

    return newString;
}

function validString(string) {
    if (!string) {
        return alert('You enter wrong string!'), false;
	} else {
        return true;
    }
}

function validSymbol(symbol) {
     if (!symbol) {
        return alert('You enter wrong symbol!'), false;
	} else {
        return true;
    }
}

do {
    const userString = prompt('Enter your string', "Hello world!");
    const userSymbol = prompt('Enter your symbol');
    let newString = '';

    if (!validString(userString) || !validSymbol(userSymbol)) {
        if(!confirm('You want try again?')) break;
	} else {
        newString = userString.trim();
        alert(`This is your new string: ${delSymbol(newString, userSymbol)}`)
    }
} while (true);