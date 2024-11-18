const usd = 41;
const eur = 43;
const pln = 9;

do{
    const currency = prompt('Enter currency: usd/eur/pln', 'usd')
    if(!currency){
        alert('You enter wrong currency!');
        if(!confirm('You want try again?')) break;
    } else {
       switch (currency.toLowerCase()) {
            case 'usd': {
                console.log('Usd:')
                for(let i = 10; i < 110; i+=10) console.log(`${i}$ = ${usd * i}₴`);
                break;
            }
            case 'eur': {
                console.log('Euro:')
                for(let i = 10; i < 110; i+=10) console.log(`${i}€ = ${eur * i}₴`);
                break;
            }
            case 'pln': {
                console.log('Polish Zloty:')
                for(let i = 10; i < 110; i+=10) console.log(`${i}zł = ${pln * i}₴`);
                break;
            }
            default:{
                alert('You enter wrong currency!');
            }
	    }
        if(!confirm('You want try again?')) break;
    }
} while(true);