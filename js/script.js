const goods = [{
        title: "mango people t&#8209;shirt",
        price: 100,
        src: "./img/cart-goods-1.jpg",
        alt: "man in sweatshirt and shorts",
        color: "red",
        size: "Xl",
        quantity: 2
    },
    {
       title: "jacket",
        price: 350,
        src: "./img/cart-goods-2.jpg",
        alt: "man in shirt and trousers",
        color: "red",
        size: "Xl",
        quantity: 1
    },
    {
        title: "shoes",
        price: 250,
        src: "./img/cart-goods-1.jpg",
        alt: "man in sweatshirt and shorts",
        color: "black",
        size: "45",
        quantity: 1
    },
    {
        title: "socks",
        price: 50,
        src: "./img/cart-goods-2.jpg",
        alt: "man in sweatshirt and shorts",
        color: "red",
        size: "43-46",
        quantity: 2
    }
];

const $goodsList = document.querySelector(".cart__goods_list");

const renderGoodsItem = ({
    title,
    price,
    src,
    alt,
    color,
    size,
    quantity
}) => {
    return `<li class="cart__goods_item">
   <img src=${src} alt=${alt} class="cart__goods_item-image"
       width="262" height="306">
   <div class="cart__goods_item-wrap">
       <div class="cart__goods_item-text">
           <h2 class="cart__goods_item-tittle">${title}</h2>
           <ul class="cart__goods_char-list">
               <li class="cart__goods_char-item">Price: <span
                       class="cart__goods_char-price">&dollar;${price}</span></li>
               <li class="cart__goods_char-item">Color: ${color}</li>
               <li class="cart__goods_char-item">Size: ${size}</li>
               <li class="cart__goods_char-item">Quantity: <span
                       class="cart__goods_char-quantity">${quantity}</span></li>
           </ul>
       </div>
       <button class="cart__goods_close button">
           <img src="img/navbar-close.svg" class="cart__goods_close-img"
               alt="cart close">
       </button>
   </div>
</li>`;
};

const renderGoodsList = (list = goods) => { //  дополнительная переменная list для большей гибкости и возможности переиспользования функции
    let goodsList = list.map(
        item => renderGoodsItem(item)
    ).join(""); 

    $goodsList.insertAdjacentHTML("beforeend", goodsList);
}

renderGoodsList();