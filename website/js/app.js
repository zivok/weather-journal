import layoutHandler from "./layout.js";
import isValidField from "./validation.js";
import { simpleFetch } from "./simpleFetch.js";

function createEntity({ zip, feeling }) {
    simpleFetch.get("/weather", { zip })
    .then(({ temp }) => simpleFetch.post("/entries", { zip, temp, feeling }))
    .then(() => updateUI());
}

function createEntityHandler() {
    const zipEl = document.querySelector("#zip");
    const feelingEl = document.querySelector("#feelings");
    if (isValidField(zipEl, feelingEl)) {
        createEntity({ zip: zipEl.value, feeling: feelingEl.value });
        layoutHandler("create");
    }
}

function isMatches(ev, sel) {
    return ev.target.matches(sel);
}

document.addEventListener("click", function(ev) {
    if (isMatches(ev, "#create")) {
        createEntityHandler();
    } else if (isMatches(ev, "#index") || isMatches(ev, "#new")) {
        layoutHandler(ev.target.id);
    }
});

document.addEventListener("DOMContentLoaded", updateUI);

function formatTemp(kelvin) {
    const celsius = kelvin - 273.15;
    return `${celsius.toFixed(2)}°C`;
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString("en-US", options);
}

function updateUI() {
    simpleFetch.get("/entries").
        then(entries => {
            const fragment = document.createDocumentFragment();
            const template = document.querySelector("template").content;
            const currentEntriesCount = document.querySelectorAll(".entry").length;
            const newEntries = entries.slice(currentEntriesCount, entries.length);
            newEntries.forEach(({ date, temp, feeling }) => {
                template.querySelector(".date").textContent = formatDate(date);
                template.querySelector(".temp").textContent = formatTemp(temp);
                template.querySelector(".feelings").textContent = feeling;
                const clone = document.importNode(template, true);
                fragment.appendChild(clone);
            });
            document.querySelector(".entries").appendChild(fragment);
        });
}