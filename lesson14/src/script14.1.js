const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const state = { currentIndex: 0};

function updateSlider(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    checkSliderEdges();
}


function checkSliderEdges() {
    if (state.currentIndex === 0) {
        prevButton.disabled = true;
        prevButton.classList.add('disabled');
    } else {
        prevButton.disabled = false;
        prevButton.classList.remove('disabled');
    }

    if (state.currentIndex === dots.length - 1) {
        nextButton.disabled = true;
        nextButton.classList.add('disabled');
    } else {
        nextButton.disabled = false;
        nextButton.classList.remove('disabled');
    }
}

prevButton.addEventListener('click', () => {
    state.currentIndex = (state.currentIndex > 0) ? state.currentIndex - 1 : dots.length - 1;
    updateSlider(state.currentIndex);
});

nextButton.addEventListener('click', () => {
    state.currentIndex = (state.currentIndex < dots.length) ? state.currentIndex + 1 : 0;
    updateSlider(state.currentIndex);
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        state.currentIndex = i;
        updateSlider(state.currentIndex);
    });
});

checkSliderEdges();