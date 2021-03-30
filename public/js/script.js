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
                const cartItem = JSON.parse(JSON.stringify(good));
                cartItem.quantity = 1;

                fetch('/addToCart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(cartItem)
                    })
                    .then(response => response.json())
                    .then(data => {
                        elem.cart = data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

            function hasAlready(elem) { // проверяем по id, есть ли уже в корзине выбранный товар
                return elem.cart.find(item => item.id === good.id);
            }
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
                //this.isLoaded = true;
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