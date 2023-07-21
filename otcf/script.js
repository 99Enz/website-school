const buttons = document.getElementById("buttons")
const container = document.getElementById("image-container")

function move() {
//nie musimy używać if ponieważ w linijce 9 (container.offsetWidth - zdjęcie zajmuje cały kontener * this.value - przesuń się o jedno zdj) = 0
    if (this.value === "0") {
        container.style.transform = "translateX(0)"
    } else {
        container.style.transform = "translateX(-" + (container.offsetWidth * this.value) + "px)"
    }

//nadajemy klasę active tylko jednemu przyciskowi, usuwamy z pozostałych
    const buttons2 = buttons.getElementsByTagName("button")
    for (let i = 0; i < buttons2.length; i++) {
        buttons2[i].classList.remove("active")
    }
//this - przycisk
    this.classList.add("active")
}

for (let i = 0; i < 3; i++) {
    const button = document.createElement("button")
    // button.innerHTML = i.toString()
    button.value = i.toString() //atrybut value działa na stringu - i - jest domyślnie liczbą
    button.addEventListener("click", move)
    if (i === 0) { //pierwsze zdj jest widoczne - bez if  wszystkie przyciski są aktywne
        button.classList.add("active")
    }

    buttons.appendChild(button)  //dopinam je w html trzykrotnie
}

const rangeButton = document.getElementById("sliderButton")
const slideImage = document.getElementById("imageSlide")
const containerSix = document.getElementById("pageSix")

rangeButton.addEventListener("input", () => {
    let offset = ((slideImage.offsetWidth - containerSix.offsetWidth) / 100 * rangeButton.value)
    slideImage.style.transform = "translateX(-" + offset + "px)"
})


const slideInElement = document.getElementById('slideInElement')
slideInElement.classList.add('hidden') //opacity 0 ,dispay none się nie wyświetla

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { //w momencie najechania obiekt się pokazuje
            entry.target.classList.remove('hidden')
            entry.target.classList.add('slideInFromRight')
        }
    })
});
observer.observe(slideInElement)

const observerLetter2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("letter2")) {
                entry.target.classList.remove('hidden')
                entry.target.classList.add("slideInFromTop")
            } else if (entry.target.classList.contains("letter7")) {
                entry.target.classList.remove('hidden')
                entry.target.classList.add("slideInFromBottom")
            } else if (entry.target.classList.contains("letter1")) {
                entry.target.classList.remove('hidden')
                entry.target.classList.add("slideInFromLeft")
            }
        }
    })
})

const letters = document.querySelectorAll(".lete")
letters.forEach(letter => {
    letter.classList.add('hidden')
    observerLetter2.observe(letter)
}); //wywoła się 3x ponieważ mam trzy cyferki w html

//canvas
window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');

    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    //zmienne
    let painting = false;


    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) { //e argumentem funkcji, zdarzeniem myszy
        if (!painting) return;
        ctx.lineWidth = 3;
        ctx.lineCap = "round"
        ctx.strokeStyle = '#f4c021'

        const [mouseX, mouseY] = [e.offsetX, e.offsetY]
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
    }

    //zdarzenia - EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});
