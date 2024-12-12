const div = document.createElement('div');
const img = document.createElement('img');
const randomNum = Math.floor(Math.random() * 9) + 1;

img.src = `./img/${randomNum}.jpg`;

div.append(img);

document.body.append(div);