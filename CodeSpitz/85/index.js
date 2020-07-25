const dataLoader = async function*(...urls) {
  for (const url of urls) {
    yield await (await fetch(url, { method: "GET" })).json();
  }
};

const render = async function(...urls) {
  for await (const json of dataLoader(...urls)) {
    console.log(json);
  }
};

render("1.json", "2.json", "3.json");
