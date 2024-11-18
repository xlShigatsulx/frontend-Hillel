do {
    const N = parseInt(prompt('Enter N'));
    
    if(!N || isNaN(N)){
        alert('You enter wrong N!');
        if(!confirm('You want try again?')) break;
    } else {
        if(!Number.isInteger(N)){
            alert('You enter wrong N!');
        } else {
            console.log(`All integers from 1 to 100, whose square does not exceed N = ${N}:`);
            for(let i = 1; i < 100; i++) if(Math.pow(i, 2) < N) console.log(`${i} * ${i} = ${Math.pow(i, 2)}`);
        }
        if(!confirm('You want try again?')) break;
    }
} while(true);