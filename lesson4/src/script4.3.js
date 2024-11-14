let age = null;
let messageCity = '';
let messageSport = '';

do{
    const birthDate = prompt('Введіть свій рік народження', '2000')
    if(birthDate === '' || birthDate === null){
        alert('Шкода, що Ви не захотіли ввести свій рік народження'); 
        break;
    } else if (!isNaN(birthDate) && birthDate.length === 4 && birthDate <= 2024) {
        age = 2024 - birthDate;
        break;
    } else {
        alert('Рік народження введено не вірно!');
        if(confirm('Хочете продовжити чи спробувати ввести рік народження знову?')) break;
    }

} while(true);

const city = prompt('Введіть місто у якому жевеш', 'Київ');
if (city === '' || city === null) alert('Шкода, що Ви не захотіли ввести своє місто');

const favoriteSport = prompt('Введіть улюблений вид спорту', 'Футбол');
if(favoriteSport === '' || favoriteSport === null) alert('Шкода, що Ви не захотіли ввести свій улюблений вид спорту');

switch (city) {
	case 'Київ': {
        messageCity = 'Ти живеш у столиці України';
        break;
	}
	case 'Вашингтон': {
        messageCity = 'Ти живеш у столиці Сполучених Штатів Америки';
        break;
	}
	case 'Лондон': {
        messageCity = 'Ти живеш у столиці Англії';
        break;
	}
    default: {
        messageCity = `Ти живеш у місті ${city}`;
        break;
    }
}

switch (favoriteSport) {
	case 'Футбол': {
		messageSport = 'Круто! Хочеш стати Ліонель Мессі?';
        break;
	}
	case 'Волейбол': {
		messageSport = 'Круто! Хочеш стати Каміла Хабібулліна?';
        break;
	}
	case 'Баскетбол': {
		messageSport = 'Круто! Хочеш стати Леброн Джеймс?';
        break;
	}
	default: {
        messageSport = 'Круто! Бажаю успіхів!';
        break;
	}
}

alert(`Ваш вік: ${age} \n${messageCity}\n${messageSport}`);