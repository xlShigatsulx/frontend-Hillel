"use strict";

function Student(name, surname, birthDate, assessments = []) {
	this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
    this.assessments = assessments;
    this.attendance = Array(25).fill(false);
    this.counterlessons = 0;
    this.counterAttendance = 0
}

Student.prototype.getAge = function () {
    Object.defineProperty(this, 'age', {
        get() {
            let totalYear = new Date().getFullYear();
            return totalYear - this.birthDate;
        }
    });
    console.log(this.age);
}

Student.prototype.getAverage = function () {
    if (this.assessments.length === 0) return console.log('Array empty!');

    const sum = this.assessments.reduce((acc, el) => acc + el, 0);
    return sum / this.assessments.length;
}

Student.prototype.present = function () {
	if (this.counterlessons <= this.attendance.length) {
		this.attendance[this.counterlessons] = true;
		this.counterlessons++;
		this.counterAttendance++;
	}
    return this;
}

Student.prototype.absent = function () {
	if (this.counterlessons <= this.attendance.length) {
		this.attendance[this.counterlessons] = false;
		this.counterlessons++;
	}
    return this;
}

Student.prototype.summary = function () {
    const average = this.getAverage();
    const presenceRate = this.counterAttendance / this.counterlessons;

	if (average > 90 && presenceRate > 0.9) {
		console.log('Молодець!');
	} else if (average > 90 && presenceRate > 0.9) {
		console.log('Добре, але можна краще');
	} else {
		console.log('Редиска!');
	}
}

const student1 = new Student('exampleName1', 'exampleSurname1', 1999, [100, 99, 80, 1]);
const student2 = new Student('exampleName2', 'exampleSurname2', 1998, [0, 2]);

student1.present().absent().present();

student1.summary();
student1.getAge();