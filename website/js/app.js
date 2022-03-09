import layoutHandler from "./layout.js";

function createHandler() {
    const zipEl = document.querySelector("#zip");
    const feelingEl = document.querySelector("#feelings");
    if (zipEl.validity.valid && feelingEl.validity.valid) {
        createEntity({ zip: zipEl.value, feeling: feelingEl.value });
        layoutHandler("create");
    }
}

document.addEventListener("click", function(ev) {
    if (ev.target.matches("#create")) {
        createHandler();
    } else if (ev.target.matches("#index") || ev.target.matches("#new")) {
        layoutHandler(ev.target.id);
    }
});

document.addEventListener("DOMContentLoaded", updateUI);

function createEntity({ zip, feeling }) {
    get("/weather", { zip })
    .then(({ temp }) => {
        post("/entries", { zip, temp, feeling });
    })
    .then(() => {
        updateUI();
    });
}

function updateUI() {
    get("/entries").
        then(entries => {
            const fragment = document.createDocumentFragment();
            const template = document.querySelector("template").content;
            const entryCount = document.querySelectorAll(".entry").length;
            entries.slice(entryCount, entries.length).forEach(({ date, temp, feeling }) => {
                template.querySelector(".date").textContent = date;
                template.querySelector(".temp").textContent = `${temp.toFixed(2)}°C`;
                template.querySelector(".feelings").textContent = feeling;
                const clone = document.importNode(template, true);
                fragment.appendChild(clone);
            });
            document.querySelector(".entries").appendChild(fragment);
        });
}

function buildUrl(path, params) {
    params = Object.entries(params).map(p => p.join("=")).join("&");
    return params ? `${path}?${params}` : path;
}

async function get(path, params = {}) {
    const url = buildUrl(path, params);
    console.log(url);
    const res = await fetch(url);
    try {
        const json = await res.json();
        console.log(json);
        return json;
    } catch(error) {
        console.log("error: " + error);
    }
}

async function post(url, data = {}) {
    console.log(url);
    console.log(data);
    const res = await fetch(url, {
        method: "POST", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },     
        body: JSON.stringify(data), 
      });
      console.log(res.status);
}