let helper = document.createElement("div")
let borders = document.createElement("button")
borders.innerText = "Add borders"

let colors = document.createElement("button")
colors.innerText = "Add Background"

helper.appendChild(borders)
helper.appendChild(colors)

let body = document.querySelector("body");
body.appendChild(helper)
let all = document.querySelectorAll("*")

colors.onclick = toggleColors
borders.onclick = toggleBorders

let colors_check = false;
let borders_check = false;

function toggleColors() {
    if (!colors_check) {
        all.forEach(e => e.style.background = "rgba(255,0,0,0.05)")
        colors_check = true
    }
    else {
        all.forEach(e => e.style.background = "")
        colors_check = false
    }
}

function toggleBorders() {
    if (!borders_check) {
        all.forEach(e => e.style.border = "solid 2px black")
        borders_check = true
    }
    else {
        all.forEach(e => e.style.border = "")
        borders_check = false;
    }
}

let style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    position: "fixed",
    top: "5%",
    left: "5%",
    background: "white",
    fontSize: '12px',
    padding: '2%',
};

Object.assign(helper.style, style);