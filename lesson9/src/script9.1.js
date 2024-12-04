let company = {
	sales: [
		{ name: 'John', salary: 1000 },
		{ name: 'Alice', salary: 600 },
	],
	development: {
		web: [
			{ name: 'Peter', salary: 2000 },
			{ name: 'Alex', salary: 1800 },
		],
		internals: [{ name: 'Jack', salary: 1300 }]
	}
}

function companySalarySum(data) {
    if(data === null || typeof data !== 'object') return data;

    let salarySum = 0;

    if(Array.isArray(data)){
        for (let i = 0; i < data.length; i++) {
            salarySum += data[i].salary;
        }
    } else {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                salarySum += companySalarySum(data[key]);
            }
        }
    }
    return salarySum;
}

const salarySum1 = companySalarySum(company);
console.log('Sum salary: ', salarySum1);