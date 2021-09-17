import { Intro } from './intro';

// Start intro
const intro = new Intro(document.querySelector('.circles'));
document.body.classList.remove('loading');
intro.start();


// Circular menu
const buttons = document.querySelectorAll(".menu__item");
let activeButton = document.querySelector(".menu__item.active");

buttons.forEach(item => {

    const text = item.querySelector(".menu__text");
    setLineWidth(text, item);

    window.addEventListener("resize", () => {
        setLineWidth(text, item);
    })

    item.addEventListener("click", function() {
        if (this.classList.contains("active")) return;

        this.classList.add("active");
        
        if (activeButton) {
            activeButton.classList.remove("active");
            activeButton.querySelector(".menu__text").classList.remove("active");
        }
        
        handleTransition(this, text);
        activeButton = this;

    });

    
});

function setLineWidth(text, item) {
    const lineWidth = text.offsetWidth + "px";
    item.style.setProperty("--lineWidth", lineWidth);
}

function handleTransition(item, text) {

    item.addEventListener("transitionend", (e) => {

        if (e.propertyName != "flex-grow" || 
        !item.classList.contains("active")) return;

        text.classList.add("active");
        
    });

}

// Info winbox
const info = document.querySelector('#info');
const infoContent = document.querySelector('#info-content');

info.addEventListener('click', () => {
  const infoBox = new WinBox({
    border: 4,
    width: '275px',
    height: '350px',
    x: "center",
    y: "center",
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: infoContent,
    resize: true,
  })
});
