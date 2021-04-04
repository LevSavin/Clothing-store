require('./components/navbar.js');

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