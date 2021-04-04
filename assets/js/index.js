/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (() => {

Vue.component('navbar', {
        inject: ["toggleNavbar"],
        template: `<div class="navbar">
    <button v-on:click="toggleNavbar" class="navbar__close button" id="navbarClose" type="button">
        <img src="img/navbar-close.svg" alt="navbar close" width="12" height="12">
    </button>
    <a href="catalog.html" class="navbar__tittle">Catalog</a>
    <ul class="navbar__all-categories">
        <li class="navbar__categorie">
            <ul class="navbar-list">
                <li class="navbar-list__item-tittle"><a href="catalog.html"
                        class="navbar-list__item-link-tittle">man</a>
                </li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Accessories</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Bags</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Denim</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">T-Shirts</a></li>
            </ul>
        </li>
        <li class="navbar__categorie">
            <ul class="navbar-list">
                <li class="navbar-list__item-tittle"><a href="catalog.html"
                        class="navbar-list__item-link-tittle">woman</a>
                </li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Accessories</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Jackets & Coats</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Polos</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">T-Shirts</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Shirts</a></li>
            </ul>
        </li>
        <li class="navbar__categorie">
            <ul class="navbar-list">
                <li class="navbar-list__item-tittle"><a href="catalog.html"
                        class="navbar-list__item-link-tittle">kids</a>
                </li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Accessories</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Jackets &amp; Coats</a>
                </li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Polos</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">T-Shirts</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Shirts</a></li>
                <li class="navbar-list__item"><a href="catalog.html"
                        class="navbar-list__item-link">Bags</a></li>
            </ul>
        </li>
    </ul>
</div>`
})

/***/ }),
/* 2 */
/***/ (() => {

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

/***/ }),
/* 3 */
/***/ (() => {

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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);

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
})();

/******/ })()
;