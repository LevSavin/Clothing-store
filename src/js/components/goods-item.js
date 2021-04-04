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