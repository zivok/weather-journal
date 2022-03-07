const maxActiveWidth = 900;

const entriesLayout = document.querySelector("#entries__layout");
const newLayout = document.querySelector("#new__layout");

function isOnActiveWidth() {
    return window.matchMedia(`(max-width: ${maxActiveWidth}px)`).matches;
}

document.addEventListener("click", function (ev) {
    if (!isOnActiveWidth()) {
        return;
    }
    if (ev.target.matches("#new")) {
        newLayout.classList.remove("hidden");
        entriesLayout.classList.remove("open");
    } else if (ev.target.matches("#index") || ev.target.matches("#create")) {
        entriesLayout.classList.add("open");
        newLayout.classList.add("hidden");
    }
});