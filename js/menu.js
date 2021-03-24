class Menu {
    constructor() {
        const navbar = this.setVisual(document.querySelector("#openNavbar"));
        const close = this.setVisual(document.querySelector("#navbarClose"));
    }

    setVisual($element) {
        $element.addEventListener('click', () => {
            document.querySelector(".navbar").classList.toggle("visually-hidden")
        })
    }

}
const menu = new Menu();