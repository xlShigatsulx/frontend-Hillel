const userObj = {
	name: 'Ruslan',
	surname: 'Tymofiienko',
	age: 20,
	homeAddress: 'Odessa'
}

function User(arg1, arg2) {
    if (typeof arg1 === 'object') {
        this.name = arg1.name;
	    this.surname = arg1.surname;
        this.age = arg1.age;
        this.homeAddress = arg1.homeAddress;
    } else {
        this.name = arg1;
	    this.surname = arg2;
        this.age = null;
		this.homeAddress = null;
    }
    
}

User.prototype.getInfo = function () {
	return {
		name: this.name,
		surname: this.surname,
        age: this.age,
        homeAddress: this.homeAddress
	}
}

const user = new User('Ruslan', 'Tymofiienko');
const user2 = new User(userObj);


console.log(user.getInfo());
console.log(user2.getInfo());