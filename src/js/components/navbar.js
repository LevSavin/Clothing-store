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