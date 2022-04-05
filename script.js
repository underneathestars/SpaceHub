const c = document.createElement;

const createCard = (title, desc, imgUrl, id) => {
    const divElement = c("div");
    const h4Element = c("h4");
    const imgElement = c("img");
    const descElement = c("p");
    const idElement = c("p");

    divElement.classList.add("carouselCard");
    descElement.classList.add("tvSerieDesc");
    h4Element.classList.add("tvSerieTitle");
    imgElement.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + imgUrl);
    imgElement.setAttribute("alt", "immagine");
    idElement.setAttribute("id", id);
    h4Element.textContent = title;
    descElement.textContent = desc;
    idElement.textContent = "";

    divElement.append(h4Element, imgElement, descElement, idElement);
    document.querySelector(".carouselContainer").appendChild(divElement);
};

//CON QUESTA FUNZIONE FACCIO IL FETCH DELL'API DI MOVIEDB RELATIVO ALLE SERIE PIU' POPOLARI//

async function getTVSeriesData() {
    const response = await fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=bfa2ac7993e72bf5d8c49347f4e8c24e", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.json();
}

//CON QUESTA FUNZIONE MAPPO I RISULTATI DELL'API E NE ESTRAGGO SOLO LE KEYS CHE MI SERVONO//

getTVSeriesData()
    .then((resultAPI) => {
        resultAPI.results.map((tvSerie) => 
        createCard(
            tvSerie.name,
            tvSerie.overview,
            tvSerie.backdrop_path,
            tvSerie.id,
        ));
    })
    .then(() => {
        const cardsEl = document.querySelectorAll(".carouselCard");

        cardsEl.forEach((card) => {
            const imgElement = card.querySelector("img");
            const title = card.querySelector("h4");
            const desc = card.querySelector(".tvSerieDesc");
            const idElement = card.querySelector("p"); 
        });
    });