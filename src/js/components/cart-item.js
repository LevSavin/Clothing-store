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