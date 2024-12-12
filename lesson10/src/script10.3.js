const contacts = [
	{
		name: 'Serhii',
		phone: '+380999999999',
		email: 'example@email.com'
	}
];

/*let idCounter = 1
function Contact({ name, phone, email }) {
    Object.defineProperty(this, 'id', {
        value: (idCounter++).toString(),
        writable: false,
        configurable: false,
        enumerable: false
    });
	this.name = name;
	this.phone = phone;
	this.email = email;
};*/

const ContactConstructor = () => {
    let idCounter = 1;

    return function Contact({ name, phone, email }) {
        Object.defineProperty(this, 'id', {
            value: (idCounter++).toString(),
            writable: false,
            configurable: false,
            enumerable: false,
        });
        this.name = name;
        this.phone = phone;
        this.email = email;
    };
};

const Contact = ContactConstructor();


function Book(contacts) {
	this.contacts = contacts || [];
};

Book.prototype.find = name => {
    const contact = book.contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    return contact || null;
};

Book.prototype.add = contact => {
    contact instanceof Object && contact.name && contact.phone && contact.email
        ? book.contacts.push(new Contact(contact))
        : console.error('The contact must be an object with valid data.');
}

Book.prototype.remove = id => {
	book.contacts = book.contacts.filter(contact => contact.id !== id)
};

Book.prototype.update = (id, newData) => {
    if(!newData) {
        console.error('Cannot update the contact.');
        return;
    } else {
        const contact = book.contacts.find(contact => contact.id === id);
	    if (contact) {
		    Object.assign(contact, newData);
	    } else {
		    console.error(`Contact with id ${id} not found.`);
	    }
    }
}

const mappedContacts = contacts.map(el => new Contact(el));

const book = new Book(mappedContacts);

console.log('Contact book at the beginning:', book)

book.add({ name: 'Anna', phone: '+380666666666', email: 'anna@email.com' });
book.add({ name: 'Ruslan', phone: '+380555555555', email: 'ruslan@email.com' });
book.add({ name: 'Vitalya', phone: '+380444444444', email: 'vitalya@email.com' });
console.log('Contacts book after adding:', book)

const foundContacts = book.find('Ruslan')
console.log('Found contacts:', foundContacts)

book.update(foundContacts.id, { phone: '+380777777777' })
console.log('Contact book after updating:', book)

book.remove('4')
console.log('Contact book after deleting:', book)