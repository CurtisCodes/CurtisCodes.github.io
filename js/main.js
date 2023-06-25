const weatherButton = document.querySelector('.firstSection button');
const todosApp = document.querySelector('.secondSection button');
const container = document.querySelector('.container');
const todoContainer = document.querySelector('.todoContainer');

// weather app visibility
weatherButton.addEventListener('click', e => {
    e.preventDefault();
    if(container.style.display == 'block'){
        container.style.display = 'none';
    } else {
        container.style.display = 'block';
    };
});

//todos app visibility
todosApp.addEventListener('click', e => {
    e.preventDefault();
    if(todoContainer.style.display == 'block'){
        todoContainer.style.display = 'none';
    } else {
        todoContainer.style.display = 'block';
    };
});


//todos
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');


const generateTemplate = todo => {

    const html = `
    <li class="text-light list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;

};

addForm.addEventListener('submit', e => {

    e.preventDefault();
    const todo = addForm.add.value.trim();
    
    if(todo.length){
        generateTemplate(todo);
        addForm.reset();
    }

});

//  delete todos

list.addEventListener('click', e => {
    
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }

});

// search

const filterTodos = (term) => {

    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));

};

// keyup

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});