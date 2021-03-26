const API_URL = './js/goods.json';

Vue.component('goods-item', {
    template: `<li class="featured__item" :data-id="id">
    <div class="featured__picture">
        <img class="featured__picture_image" :src="src" :alt="alt" width="360" height="420">
        <div class="featured__image-box">
            <button class="button featured__item-button" type="button" :data-itemAdd_id="id">
                <img src="img/icon-cart.svg" alt="icon cart" width="26" height="24">
                <span class="featured__item-button_text">Add to Cart</span>
            </button>
        </div>
    </div>
    <a href="#" class="featured__item_text">{{ title }}</a>
    <p class="featured__item_subtext">Known for her sculptural takes on traditional tailoring,
        Australian arbiter of cool Kym Ellery teams up with Moda&nbsp;Operandi.</p>
    <p class="featured__item_price">&dollar;{{ price }}</p>
</li>`,
    props: ['title', 'price', 'src', 'alt', 'color', 'size', 'id']
})

Vue.component('search-input', {
    template: `<input class="featured__search" v-model="search" v-on:input="searchHandler" placeholder="What are we looking for?">`,
    data() {
        return {
            search: '',
        }
    },
    methods: {
        searchHandler() {
            this.$emit('search', this.search);
        },
    }
})

const vue = new Vue({
    el: '#app',
    data: {
        cart: [],
        goods: [],
        filtredGoods: [],
        search: ''
    },
    methods: {

        addToCartHandler(e) {
            const id = e.target.closest('.featured__item').dataset.id;
            const good = this.goods.find((item) => item.id == id);
            let elem = this;

            if (hasAlready(elem) == undefined) { // если товара нет в корзине, то добавить его
                let cartItem = Object.create(good)
                cartItem.quantity = 1;
                elem.cart.push(cartItem);
            }

            function hasAlready(elem) { // проверяем по id, есть ли уже в корзине выбранный товар
                return elem.cart.find(item => item.id === good.id);
            }
            console.log(this.cart)
        },

        addToCart(button) {
            let itemNum = button.id.split("_")[1] //индекс товара из массива товаров в каталоге
            let selectedItem = this.goods[itemNum];

            if (hasAlready() == undefined) { // если товара нет в корзине, то добавить его
                let cartItem = Object.create(selectedItem)
                cartItem.quantity = 1;
                cartArray.push(cartItem);
            }

            function hasAlready() { // проверяем по id, есть ли уже в корзине выбранный товар
                return cartArray.find(x => x.id === selectedItem.id);
            }
        },

        searchHandler(search) {
            if (search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },

        fetch(error, success) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        success(JSON.parse(xhr.responseText));
                    } else if (xhr.status > 400) {
                        error('Ошибка');
                    }
                }
            }

            xhr.open('GET', API_URL, true);
            xhr.send();
        },

        fetchPromise() {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        }
    },

    mounted() {
        this.fetchPromise()
            .then(data => {
                this.goods = data;
                this.filtredGoods = data;
            })
            .catch(err => {
                console.log(err);
            })
    }
})