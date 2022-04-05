const params = new URLSearchParams(window.location.search)
var id = 0;

if (params.has("id")) {
    id = params.get("id");
} else {
    window.location = "/index.html";
}


const TVSeriesPreview = (title, homepage, genres, overview, imgURL) => {
    const divElement = document.querySelector("div");
    const h1Element = document.querySelector("h1");
    const linkElement = document.querySelector("#a");
    const genresElement = document.querySelector("h5");
    const descElement = document.querySelector("p");
    const imgElement = document.querySelector("#img");

    imgElement.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + imgURL);
    imgElement.setAttribute("alt", "poster");
    h1Element.textContent = title;
    linkElement.setAttribute("href", homepage);
    genresElement.textContent = "Generi: " + genres.map(item => item.name).join(", ");
    descElement.textContent = overview;
};

async function getTVSeriesData() {
    const response = await fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=bfa2ac7993e72bf5d8c49347f4e8c24e", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.json();
}

getTVSeriesData()
    .then((tvSerie) => {
        TVSeriesPreview(
            tvSerie.name,
            tvSerie.homepage,
            tvSerie.genres,
            tvSerie.overview,
            tvSerie.poster_path
        );
    });
;
