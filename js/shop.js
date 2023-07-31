let storeButton = document.querySelector('.store-button');
let virtualStore = document.querySelector('.virtual-store');

let shopItemsData = [
    {
        id: "shopItem1",
        name: "Coffee Table",
        price: 45,
        desc: "Put your glass on a coaster you swine.",
        img: "img/img-2.jpg",
    },
    {
        id: "shopItem2",
        name: "Table / Chairs",
        price: 300,
        desc: "A table for dining and chairs for sitting.",
        img: "img/img-3.jpg"

    },
    {
        id: "shopItem3",
        name: "Lamp",
        price: 25,
        desc: "Brightens an otherwise darker room.",
        img: "img/img-4.jpg"
    },
    {
        id: "shopItem4",
        name: "Couch",
        price: 130,
        desc: "It's comfortable to sit on.",
        img: "img/img-5.jpg"
    }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let update = (id) => {
    let search = basket.find ((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.quantity;
    calculation();
};

let calculation = () => {
    let cartIcon = document.querySelector('.cartAmount');
    cartIcon.innerHTML = basket.map(x => x.quantity).reduce((x,y) => x+y, 0);
};

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find(x => x.id === selectedItem.id);

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            quantity: 1
        });
    } else {
        search.quantity += 1;
    }
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find(x => x.id === selectedItem.id);

    if(search === undefined) return;
    else if (search.quantity === 0) return;
    else {
        search.quantity -= 1;
    }
    update(selectedItem.id);

    basket = basket.filter(x => x.quantity !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};

// shop

let shop = document.getElementById("shop");

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
    .map((data) => {
        let { id, name, price, desc, img } = data;
        let search = basket.find( (x)=> x.id === id) || [];
        return `
        <div class="shop-item" id="product-id-${id}">
            <img width="150" height="150" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>${"$" + price}</h2>
                    <div class="shop-buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div class="quantity" id=${id}>${search.quantity === undefined ? 0 : search.quantity}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join(""));
};

generateShop();
calculation();

// cart

let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let cartCalculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map(x => x.quantity).reduce((x,y) => x+y, 0);
};

cartCalculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((x) => {
            let { id, quantity} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
                <div class="cart-item">
                    <img width="100" height="100" src=${img} alt="">
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="shop-buttons">
                            <i onclick="cartDecrement(${id})" class="bi bi-dash-lg"></i>
                            <div class="quantity" id=${id}>${quantity}</div>
                            <i onclick="cartIncrement(${id})" class="bi bi-plus-lg"></i>
                        </div>
                        <h3>$ ${quantity * price}</h3>
                    </div>
                </div>
                    `;
        }).join("");
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML= `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to Home</button>
        </a>
        `;
    };

};

generateCartItems();

let cartIncrement = (id) => {
    let selectedItem = id;
    let search = basket.find(x => x.id === selectedItem.id);

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            quantity: 1
        });
    } else {
        search.quantity += 1;
    }
    update(selectedItem.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    totalAmount();
};

let cartDecrement = (id) => {
    let selectedItem = id;
    let search = basket.find(x => x.id === selectedItem.id);

    if(search === undefined) return;
    else if (search.quantity === 0) return;
    else {
        search.quantity -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter(x => x.quantity !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    totalAmount();
};


let removeItem = id => {
    let selectedItem = id;
    basket = basket.filter(x => x.id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    cartCalculation();
    totalAmount();
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data" , JSON.stringify(basket));
    cartCalculation();
};

let totalAmount = () => {
    if (basket.length !==0) {
        let amount = basket.map(x => {
            let { quantity, id } = x;
            let search = shopItemsData.find(y => y.id === id) || [];
            return quantity * search.price;
        }).reduce((x,y) => x + y, 0);
        label.innerHTML = `
            <h2>Total Bill: $${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }
    else return;
};

totalAmount();

//  shop display

const shopContainer = document.querySelector('.shop-container');
const cartButton = document.querySelector('.cartButton');
const cartContainer = document.querySelector('.cart-container');

storeButton.addEventListener('click', e => {
    e.preventDefault();
    shopContainer.classList.remove('d-none');
    shop.classList.remove('d-none');
    cartContainer.classList.add('d-none');
    todoAndWeather.innerHTML = ``;
    toBeReplaced.classList.add('d-none');
    generateShop();
    });

cartButton.addEventListener('click', e => {
    e.preventDefault();
    shop.classList.add('d-none');
    cartContainer.classList.remove('d-none');
    generateCartItems();
    totalAmount();
    });
