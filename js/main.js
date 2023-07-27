const weatherButton = document.querySelector('.weather-app-button');
const todosButton = document.querySelector('.todo-list-button');
const clockButton = document.querySelector('.digital-clock-button');
const jsDisplay = document.querySelector('.js-projects-display');
const toBeReplaced = document.querySelector('.toBeReplaced');
const todoAndWeather = document.querySelector('.todo-and-weather');

// weather app

const weatherHtml = 
`<div class="weather-container">
    <h3>Weather App</h3>
    <form class="change-location my-4">
        <label for="city">Enter a location for weather information</label>
        <input type="text" name="city" class="form-control p-4" style="box-shadow: none;">
    </form>
    <div class="card d-none">
        <img src="https://via.placeholder.com/400x300" class="time card-img-top">
        <div class="icon bg-light mx-auto text-center">
            <img src="" alt="">
        </div>
        <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">City Name</h5>
            <h5 class="my-3">Country</h5>
            <div class="my-3">Weather Condition</div>
            <div class="display-4 my-4">
                <span>temp</span>
                <span>&deg;F</span>
            </div>
        </div>
    </div>
</div>`
;

weatherButton.addEventListener('click', e => {
    e.preventDefault();
    todoAndWeather.innerHTML = weatherHtml;
    shopContainer.classList.add('d-none');
    toBeReplaced.classList.add('d-none');

    const cityForm = document.querySelector('form');
    const card = document.querySelector('.card');
    const details = document.querySelector('.details');
    const time = document.querySelector('img.time');
    const icon = document.querySelector('.icon img');
    const updateUI = (data) => {

        // non-destructured properties
        // const cityDets = data.cityDets;
        // const weather = data.weather;

        // destructured properties
        const { cityDets, weather } = data;

        details.innerHTML = `
            <h5 class="my-3">${cityDets.EnglishName}, ${cityDets.AdministrativeArea.ID}</h5>
            <h4 class="my-2 fs-2">${cityDets.Country.LocalizedName}</h4>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Imperial.Value}</span>
                <span>&deg;F</span>
            </div>
        `;

        //update the night/day & icon images

        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

        let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
        time.setAttribute('src', timeSrc);

        // remove the d-none class if present
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        };
        console.log(data);
    };

    const updateCity = async (city) => {

        const cityDets = await getCity(city);
        const weather = await getWeather(cityDets.Key);

        return { cityDets, weather };
    };


    cityForm.addEventListener('submit', e =>{
        e.preventDefault();

        //get city value
        const city = cityForm.city.value.trim();
        cityForm.reset();

        //update the ui with new city
        updateCity(city)
            .then(data => updateUI(data))
            .catch(err => console.log(err));
    });
});

//todos

const todosHTML =     
`<div class="todo-container">
    <header class="text-center text-light my-4">
        <h3 class="mb-4">Todo List</h3>
        <form class="add text-center my-4">
            <label class="text-light">Add new todo</label>
            <input type="text" class="form-control m-auto" name="add">
        </form>
        <form class="search">
            <input type="text" class="form-control m-auto" name="search" placeholder="search todos">
        </form>
    </header>
    <ul class="list-group todos mx-auto">
        <li class="text-light list-group-item d-flex justify-content-between align-items-center">
            <span>Buy groceries</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
        <li class="text-light list-group-item d-flex justify-content-between align-items-center">
            <span>Mop the floor</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
        <li class="text-light list-group-item d-flex justify-content-between align-items-center">
            <span>Sweep the leg</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    </ul>
</div>`

todosButton.addEventListener('click', e => {
    e.preventDefault();
    todoAndWeather.innerHTML = todosHTML;
    shopContainer.classList.add('d-none');
    toBeReplaced.classList.add('d-none');

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

});
