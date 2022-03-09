const maxActiveWidth = 900;

const entriesLayout = document.querySelector("#entries__layout");
const newLayout = document.querySelector("#new__layout");

function isOnActiveWidth() {
    return window.matchMedia(`(max-width: ${maxActiveWidth}px)`).matches;
}

export default function layoutHandler(id) {
    if (!isOnActiveWidth()) {
        return;
    }
    if (id === "new") {
        entriesLayout.classList.add("hidden");
        newLayout.classList.remove("hidden");
    } else if (id === "create" || id === "index") {
        newLayout.classList.add("hidden");
        entriesLayout.classList.remove("hidden");
    }
}