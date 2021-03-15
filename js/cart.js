var cartArray = [{
        title: "mango people t&#8209;shirt",
        price: 10,
        src: "./img/cart-goods-1.jpg",
        alt: "man in sweatshirt and shorts",
        color: "red",
        size: "Xl",
        id: 3,
        quantity: 1
    },
    {
        title: "jacket",
        price: 150,
        src: "./img/cart-goods-2.jpg",
        alt: "man in shirt and trousers",
        color: "red",
        size: "Xl",
        id: 0,
        quantity: 1
    },
    {
        title: "shoes",
        price: 100,
        src: "./img/cart-goods-1.jpg",
        alt: "man in sweatshirt and shorts",
        color: "black",
        size: "45",
        id: 9,
        quantity: 1
    },
    {
        title: "socks",
        price: 5,
        src: "./img/cart-goods-2.jpg",
        alt: "man in sweatshirt and shorts",
        color: "red",
        size: "43-46",
        id: 5,
        quantity: 1
    }
]

class ApiMock {
    constructor() {

    }

    fetch() {
        return cartArray;
    }
}

class CartItem {
    constructor(title, price, src, alt, color, size, id, quantity) {
        this.title = title;
        this.price = price;
        this.src = src;
        this.alt = alt;
        this.color = color;
        this.size = size;
        this.id = id;
        this.quantity = quantity;
    }

    getHtml() {
        return `<li class="cart__goods_item" id="itemCart_${this.id}">
        <img src=${this.src} alt=${this.alt} class="cart__goods_item-image"
            width="262" height="306">
        <div class="cart__goods_item-wrap">
            <div class="cart__goods_item-text">
                <h2 class="cart__goods_item-tittle">${this.title}</h2>
                <ul class="cart__goods_char-list">
                    <li class="cart__goods_char-item">Price: <span
                            class="cart__goods_char-price">&dollar;${this.price}</span></li>
                    <li class="cart__goods_char-item">Color: ${this.color}</li>
                    <li class="cart__goods_char-item">Size: ${this.size}</li>
                    <li class="cart__goods_char-item">
                        Quantity: <span class="cart__goods_char-quantity" id="quantity_${this.id}">${this.quantity}</span>
                        <button data-action="increase" class="cart__goods_char-button button" id="increase_${this.id}">+</button>
                        <button data-action="decrease"class="cart__goods_char-button button" id="decrease_${this.id}">-</button>
                    </li>                            
                </ul>
            </div>
            <button data-action="removeFromCart" class="cart__goods_close button" id="removeFromCart_${this.id}">
                <img src="img/navbar-close.svg" class="cart__goods_close-img"
                    alt="cart close">
            </button>
        </div>
     </li>`;
    }
}

class Buttons {
    constructor(elem) {
        this.elem = elem;
        elem.onclick = this.onClick.bind(this); //  метод this.onClick привязывается к контексту текущего объекта this. Т.к. иначе this внутри него будет ссылаться на DOM-элемент (elem), а не на объект Buttons, и this[action] будет не тем, что нам нужно.
    }

    increase(button) {
        cartList.increase(button)
    }

    decrease(button) {
        cartList.decrease(button)
    }

    removeFromCart(button) {
        cartList.removeFromCart(button)
    }

    onClick(event) {
        let button = event.target.closest("button");
        if (button) { //проверяем, вдруг button-родителя нет
            let action = event.target.closest("button").dataset.action; // определяем значения атрибута data у кнопки
            if (action) {
                this[action](button);
            }
        }
    };
}

class MenuButtons {
    constructor() {
        this.$buttonsClear = document.querySelector(".cart__goods_button");
    }

    setClear() {
        this.$buttonsClear.addEventListener("click", event => {
            let clear = event.target.closest("button");
            if (clear) { //проверяем, вдруг button-родителя нет
                cartList.clearCart()
            }
        });
    }
}

class CartList {
    constructor() {
        this.api = new ApiMock();
        this.$cartList = document.querySelector(".cart__goods_list");
        this.goods = [];
        this.fetchGoods()
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({
            title,
            price,
            src,
            alt,
            color,
            size,
            id,
            quantity
        }) => new CartItem(title, price, src, alt, color, size, id, quantity));
        this.render();
        this.countSum();
        this.addBtn();
    }

    render() {
        this.$cartList.textContent = "";
        this.goods.forEach((good) => {
            this.$cartList.insertAdjacentHTML('beforeend', good.getHtml());
        })
    }

    addBtn() {
        this.buttons = new Buttons(DOMcartList);
        this.menuButtons = new MenuButtons()
        this.menuButtons.setClear();
    }

    countSum() {
        let initialValue = 0;
        let sum = cartArray.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.price * currentValue.quantity);
        }, initialValue);
        document.querySelector(".cart__order_subtittle-price").textContent = `${sum} \u0024`;
        document.querySelector(".cart__order_tittle-price").textContent = `${sum} \u0024`;
    }

    setId(button) {
        catalogId = button.id.split("_")[1] //индекс товара из массива товаров в каталоге
        cartId = cartArray.findIndex(x => x.id == catalogId); // индекс товара из массива корзины
    }

    increase(button) {
        this.setId(button);
        cartArray[cartId].quantity += 1;
        document.getElementById("quantity_" + catalogId).textContent = cartArray[cartId].quantity;
        this.countSum()
    }

    decrease(button) {
        this.setId(button);
        if (cartArray[cartId].quantity > 1) {
            cartArray[cartId].quantity -= 1;
            document.getElementById("quantity_" + catalogId).textContent = cartArray[cartId].quantity;
        } else {
            let remItem = document.getElementById("itemCart_" + catalogId)
            remItem.remove()
            cartArray.splice(cartId, 1)
        }
        this.countSum()
    }

    removeFromCart(button) {
        this.setId(button);
        let remItem = document.getElementById("itemCart_" + catalogId)
        remItem.remove()
        cartArray.splice(cartId, 1)
        this.countSum()
    }

    clearCart() {
        cartArray = [];
        this.countSum()
        this.$cartList.textContent = "";
    }
}

var catalogId, cartId;
const cartList = new CartList();