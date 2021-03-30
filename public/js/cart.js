Vue.component('cart-item', {
    template: `<li class="cart__goods_item" :data-id="id">
    <img :src="src" :alt="alt" class="cart__goods_item-image"
        width="262" height="306">
    <div class="cart__goods_item-wrap">
        <div class="cart__goods_item-text">
            <h2 class="cart__goods_item-tittle">{{ title }}</h2>
            <ul class="cart__goods_char-list">
                <li class="cart__goods_char-item">Price: <span
                        class="cart__goods_char-price"> &dollar; {{ price * quantity }}</span></li>
                <li class="cart__goods_char-item">Color: {{ color }}</li>
                <li class="cart__goods_char-item">Size: {{ size }}</li>
                <li class="cart__goods_char-item">
                    Quantity: <span class="cart__goods_char-quantity" >{{ quantity }}</span>
                    <button data-action="increase" class="cart__goods_char-button button">+</button>
                    <button data-action="decrease" class="cart__goods_char-button button">-</button>
                </li>                            
            </ul>
        </div>
        <button data-action="removeFromCart" class="cart__goods_close button">
            <img src="img/navbar-close.svg" class="cart__goods_close-img"
                alt="cart close">
        </button>
    </div>
 </li>`,
    props: ['title', 'price', 'src', 'alt', 'color', 'size', 'id', 'quantity']
})

const vue = new Vue({
    el: '#app',
    data: {
        cartArray: [],
        sum: 0,
        isRemoved: false,
    },
    methods: {
        cartHandler(event) {
            const button = event.target.closest("button");
            if (button) { //проверяем, вдруг button-родителя нет
                let action = event.target.closest("button").dataset.action; // определяем значения атрибута data у кнопки
                if (action) {
                    const catalogId = event.target.closest('.cart__goods_item').dataset.id;
                    const cartId = this.cartArray.findIndex(x => x.id == catalogId);
                    this[action](cartId); // передаём нужное действие и индекс товара в корзине
                }
            }
        },

        countSum() {
            let initialValue = 0;
            this.sum = this.cartArray.reduce(function (accumulator, currentValue) {
                return accumulator + (currentValue.price * currentValue.quantity);
            }, initialValue);
        },

        increase(cartId) {
            this.cartArray[cartId].quantity += 1;
            this.editCart(this.cartArray);
        },

        decrease(cartId) {
            if (this.cartArray[cartId].quantity > 1) {
                this.cartArray[cartId].quantity -= 1;
            } else {
                this.cartArray.splice(cartId, 1);
            }
            this.editCart(this.cartArray);
        },

        removeFromCart(cartId) {
            this.cartArray.splice(cartId, 1);
            this.editCart(this.cartArray);
        },

        clearCart() {
            this.editCart([]);
        },

        editCart(array) {
            fetch('/patchCart', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(array)
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.cartArray = data;
                    this.countSum();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },

    mounted() {
        fetch('/cart')
            .then(response => response.json())
            .then(data => {
                this.cartArray = data;
                this.countSum();
            })
            .catch(err => {
                console.log(err);
            })
    }
})