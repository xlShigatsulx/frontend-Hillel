const div = document.createElement('div');
const p = document.createElement('p');
const button = document.createElement('button');
button.className = 'button';

p.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod rem officia exercitationem vero consectetur delectus omnis veniam sunt! Amet nulla quis iusto eius veritatis aperiam voluptas beatae nam maxime hic.';
button.textContent = 'Click me!';

div.append(p);
div.append(button);

document.body.append(div);

function colorChanger(){
    let isColorChanged = false;

    return () => {
        if(isColorChanged){
            p.style.color = 'black';
        } else {
            p.style.color = 'red';
        }
        isColorChanged = !isColorChanged;
    };
}

const changeColorHandler = colorChanger();
button.addEventListener('click', changeColorHandler);
