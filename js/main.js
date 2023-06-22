const weatherButton = document.querySelector('section button');
const container = document.querySelector('.container');

weatherButton.addEventListener('click', e => {
    e.preventDefault();
    if(container.style.display == 'none'){
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    };
});
