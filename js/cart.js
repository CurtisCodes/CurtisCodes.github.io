let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
// let basket = JSON.parse(localStorage.getItem("data")) || [];

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
                        <div class="buttons">
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
    }
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

// let update = (id) => {
//     let search = basket.find ((x)=> x.id === id);
//     console.log(basket);
//     document.getElementById(id).innerHTML = search.quantity;
//     calculation();
// };

let removeItem = id => {
    let selectedItem = id;
    basket = basket.filter(x => x.id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    calculation();
    totalAmount();
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data" , JSON.stringify(basket));
    calculation();
}

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