function createLadder() {
   return {
    step: 0,
	up: function () {
		// підніматиме вас на одну сходинку
        this.step++;
        return this;
	},
	down: function () {
		// опускатиме вас на одну сходинку
        if(this.step === 0){
            console.log(`You cant step down, your step now ${this.step}`);
        } else {
            this.step--;
        }
        return this;
	},
	showStep: function () {
		// показує поточну сходинку
        console.log(`Now you're on the ${this.step} step`);
        return this;
	}
   }
}
let ladder1 = createLadder();
ladder1.up();
ladder1.up();
ladder1.down();
ladder1.showStep(); // 1

let ladder2 = createLadder();
ladder2.up().up().down().showStep(); // 1