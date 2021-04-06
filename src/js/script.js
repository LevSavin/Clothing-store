require('./components/navbar.js');
require('./components/goods-item.js');
require('./components/search-input.js');

const vue = new Vue({
    el: '#app',
    provide: function() {
        return {
            toggleNavbar: this.toggleNavbar
        };
    },
    data: {
        cart: [],
        goods: [],
        filtredGoods: [],
        search: '',
        isLoaded: false,
        isVisible: false,
    },
    methods: {
        toggleNavbar() {
            return this.isVisible = !this.isVisible;
        },

        addToCartHandler(e) {
            const id = e.target.closest('.featured__item').dataset.id;
            const good = this.goods.find((item) => item.id == id);

            if (this.hasAlready(good) == undefined) { // если товара нет в корзине, то добавить его
                const cartItem = JSON.parse(JSON.stringify(good));
                cartItem.quantity = 1;
                this.fetchAddToCart(cartItem)
            }
        },

        hasAlready(good) { // проверяем по id, есть ли уже в корзине выбранный товар
            return this.cart.find(item => item.id === good.id);
        },

        fetchAddToCart(cartItem) {
            return fetch('/addToCart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartItem)
                })
                .then(response => response.json())
                .then(data => {
                    this.cart = data;
                })
                .catch(err => {
                    console.log(err);
                })
        },

        searchHandler(search) {
            if (search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },

    },

    mounted() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                this.goods = data;
                this.filtredGoods = data;
                this.isLoaded = true;
            })
            .catch(err => {
                console.log(err);
            })

        fetch('/cart')
            .then(response => response.json())
            .then(data => {
                this.cart = data;
            })
            .catch(err => {
                console.log(err);
            })

    }
})