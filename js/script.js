class ApiMock {
    constructor() {

    }

    fetch() {
        return [{
                title: "mango people t&#8209;shirt",
                price: 10,
                src: "./img/cart-goods-1.jpg",
                alt: "man in sweatshirt and shorts",
                color: "red",
                size: "Xl",
                quantity: 2
            },
            {
                title: "jacket",
                price: 150,
                src: "./img/cart-goods-2.jpg",
                alt: "man in shirt and trousers",
                color: "red",
                size: "Xl",
                quantity: 1
            },
            {
                title: "shoes",
                price: 100,
                src: "./img/cart-goods-1.jpg",
                alt: "man in sweatshirt and shorts",
                color: "black",
                size: "45",
                quantity: 1
            },
            {
                title: "socks",
                price: 5,
                src: "./img/cart-goods-2.jpg",
                alt: "man in sweatshirt and shorts",
                color: "red",
                size: "43-46",
                quantity: 3
            }
        ];
    }
}

class GoodsItem {
    constructor(title, price, src, alt, color, size, quantity) {
        this.title = title;
        this.price = price;
        this.src = src;
        this.alt = alt;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
    }

    getHtml() {
        return `<li class="cart__goods_item">
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
                    <li class="cart__goods_char-item">Quantity: <span
                            class="cart__goods_char-quantity">${this.quantity}</span></li>
                </ul>
            </div>
            <button class="cart__goods_close button">
                <img src="img/navbar-close.svg" class="cart__goods_close-img"
                    alt="cart close">
            </button>
        </div>
     </li>`;
    }
}

class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.$goodsList = document.querySelector(".cart__goods_list");
        this.goods = [];
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({
            title,
            price,
            src,
            alt,
            color,
            size,
            quantity
        }) => new GoodsItem(title, price, src, alt, color, size, quantity));
    }

    render() {
        this.$goodsList.textContent = "";
        this.goods.forEach((good) => {
            this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
        })
    }

    countSum() {
        let initialValue = 0;
        let sum = this.goods.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.price * currentValue.quantity);
        }, initialValue);
        document.querySelector(".cart__order_subtittle-price").textContent = `${sum} \u0024`;
        document.querySelector(".cart__order_tittle-price").textContent = `${sum} \u0024`;
    }
}

class CartItem { // пустой класс для элемента корзины товара 
    // посчитать стоимость отдельной позиции = количеаство * цена
    // добавить товар, если товара ещё нет в корзине / увеличить количество, если товар уже имеется в корзине
    // уменьшить количество / удалить из корзины при количестве = 0
    // изменить цвет / размер
}


class CartList { // пустой класс для корзины товара 
    // посчитать итоговую цену по всем позициям
    // очистить корзину
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.countSum();
goodsList.render();