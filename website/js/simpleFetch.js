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

export const simpleFetch = { get, post }