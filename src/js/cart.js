require('./components/navbar.js');
require('./components/cart-item.js');

const vue = new Vue({
    el: '#app',
    provide: function() {
        return {
            toggleNavbar: this.toggleNavbar
        }
    },
    data: {
        cartArray: [],
        sum: 0,
        isLoaded: false,
        isVisible: false,
    },
    methods: {
        toggleNavbar() {
            return this.isVisible = !this.isVisible;
        },
        
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
                this.isLoaded = true;
            })
            .catch(err => {
                console.log(err);
            })
    }
})