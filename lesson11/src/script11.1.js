const div = document.createElement('div');

const h1 = document.createElement('h1');
h1.className = 'title';
h1.innerText = 'Таблиця Піфагора';
div.append(h1);

const table = document.createElement('table');
table.className = 'table';
div.append(table);

document.body.append(div);

const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
const emptyTh = document.createElement('th');
headerRow.appendChild(emptyTh);

for (let i = 1; i <= 10; i++) {
	const th = document.createElement('th');
	th.innerText = i;
	headerRow.appendChild(th);
}

thead.appendChild(headerRow);
table.appendChild(thead);

const tbody = document.createElement('tbody');

for (let i = 1; i <= 10; i++) {
	const row = document.createElement('tr');
	const rowHeader = document.createElement('th');
	rowHeader.innerText = i;
	row.appendChild(rowHeader);

	for (let j = 1; j <= 10; j++) {
		const cell = document.createElement('td');
		cell.innerText = i * j;
		row.appendChild(cell);
	}

	tbody.appendChild(row);
}
table.appendChild(tbody);