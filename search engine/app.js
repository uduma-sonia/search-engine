const auth = " 563492ad6f91700001000001807ff292c5e544ab8c951ed48cf9ef44";
const next = document.querySelector(".next");
const input = document.querySelector("input");
const searchBtn = document.querySelector(".searchbutton");

let pager = 1;
let search = false;
let query = "";

input.addEventListener("input", (e) => {
  e.preventDefault();

  query = e.target.value;
});

async function collectedPhoto(pager) {
  const data = await fetch(
    `https://api.pexels.com/v1/curated?per_page=15$page=${pager}`,
    {
      method: "GET",
      headers: { Accept: "application/json", Authorization: auth },
    }
  );

  const result = await data.json();
  result.photos.forEach((photo) => {
    const pix = document.createElement("div");
    pix.innerHTML = `<img src =${photo.src.large}>
      <p>Photo : ${photo.photographer}</p>
    <a href="${photo.src.large}">download</a>
        `;

    document.querySelector(".gallery").appendChild(pix);
  });
}

async function searchPhotos(query, pager) {
  const data = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${pager}`,
    {
      method: "GET",
      headers: { Accept: "application/json", Authorization: auth },
    }
  );

  const result = await data.json();
  result.photos.forEach((photo) => {
    const pix = document.createElement("div");
    pix.innerHTML = `<img src =${photo.src.large}>
      <p>Photo : ${photo.photographer}</p>
    <a href="${photo.src.large}">download</a>
        `;

    document.querySelector(".gallery").appendChild(pix);
  });
}

searchBtn.addEventListener("click", () => {
  if (input.value === "") return;
  clear();
  search = true;
  searchPhotos(query, pager);
});

function clear() {
  input.value = "";
  document.querySelector(".gallery").innerHTML = "";
  pager = 1;
}

next.addEventListener("click", () => {
  if (!search) {
    pager++;
    collectedPhoto(pager);
  } else {
    if ((query.value = "")) return;
    pager++;
    searchPhotos(query, pager);
  }
});

collectedPhoto(pager);
