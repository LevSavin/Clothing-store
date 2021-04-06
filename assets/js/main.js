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

const vue = new Vue({
    el: '#app',
    provide: function () {
        return {
            toggleNavbar: this.toggleNavbar
        }
    },
    data: {
        cartArray: [],
        isVisible: false,
    },
    methods: {
        toggleNavbar() {
            return this.isVisible = !this.isVisible;
        },
    },

    mounted() {
        fetch('/cart')
            .then(response => response.json())
            .then(data => {
                this.cartArray = data;
            })
            .catch(err => {
                console.log(err);
            })
    }
})
})();

/******/ })()
;