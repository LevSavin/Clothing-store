/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5:
/***/ (() => {

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

/***/ }),

/***/ 1:
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

/***/ })

/******/ 	});
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
__webpack_require__(5);

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
})();

/******/ })()
;