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
        entriesLayout.classList.add("hidden");
    } else if (ev.target.matches("#index") || ev.target.matches("#create")) {
        entriesLayout.classList.remove("hidden");
        newLayout.classList.add("hidden");
    }
});