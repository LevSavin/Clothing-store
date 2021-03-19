class Api {
    constructor() {
        this.url = "./js/goods.json";
    }

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
                    error("Ошибка");
                }
            }
        }

        xhr.open('GET', this.url, true);
        xhr.send();
    }

    fetchPromise() {
        return new Promise((resolve, reject) => {
            this.fetch(reject, resolve)
        })
    }
}

class GoodsItem {
    constructor(title, price, src, alt, color, size, id) {
        this.title = title;
        this.price = price;
        this.src = src;
        this.alt = alt;
        this.color = color;
        this.size = size;
        this.id = id;
    }

    getHtml() {
        return `<li class="featured__item">
                    <div class="featured__picture">
                        <img class="featured__picture_image" src="${this.src}" alt="${this.alt}" width="360" height="420">
                        <div class="featured__image-box">
                            <button class="button featured__item-button" type="button" id="itemAdd_${this.id}">
                                <img src="img/icon-cart.svg" alt="icon cart" width="26" height="24">
                                <span class="featured__item-button_text">Add to Cart</span>
                            </button>
                        </div>
                    </div>
                    <a href="#" class="featured__item_text">${this.title}</a>
                    <p class="featured__item_subtext">Known for her sculptural takes on traditional tailoring,
                        Australian arbiter of cool Kym Ellery teams up with Moda&nbsp;Operandi.</p>
                    <p class="featured__item_price">&dollar;${this.price}</p>
                </li>`;
    }
}

class Buttons {
    constructor() {
        this.$buttonsAdd = document.querySelector(".featured__list");
        this.$search = document.querySelector('#search');
    }

    setButton() {
        this.$buttonsAdd.addEventListener("click", event => {
            var button = event.target.closest("button");
            if (button) { //проверяем, вдруг button-родителя нет
                goodsList.addToCart(button)
            }
        });
    }

    setSearchHandler(callback) {
        this.$search.addEventListener('input', callback);
      }
}

class GoodsList {
    constructor() {
        this.api = new Api();
        this.$goodsList = document.querySelector(".featured__list");
        this.goods = [];
        this.filteredGoods = [];
        
        const fetch = this.api.fetchPromise();

        fetch.then((data) => {
                this.onFetchSuccess(data)
            })
            .catch((err) => {
                this.onFetchError(err)
            });
    }

    onFetchSuccess(data) {
        this.goods = data.map(({
            title,
            price,
            src,
            alt,
            color,
            size,
            id
        }) => new GoodsItem(title, price, src, alt, color, size, id));
        this.filteredGoods = this.goods;
        this.render();
        this.addBtn();
    }

    onFetchError(err) {
        this.$goodsList.insertAdjacentHTML("beforeend", `<h3>${err}</h3>`);
    }

    render() {
        this.$goodsList.textContent = "";
        this.filteredGoods.forEach((good) => {
            this.$goodsList.insertAdjacentHTML("beforeend", good.getHtml());
        })
    }

    addBtn() {
        this.buttons = new Buttons();
        this.buttons.setButton();
        this.buttons.setSearchHandler((evt) => {
            this.search(evt.target.value);
          }) 
    }

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
    }

    search(str) {
        if (str === '') {
          this.filteredGoods = this.goods;
        }
        const regexp = new RegExp(str, 'gi');
        this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
        this.render();
      }
}

const goodsList = new GoodsList();
var cartArray = [];