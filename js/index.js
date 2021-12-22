const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9db690671fa69d7f4405a84612a34ecf";
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=9db690671fa69d7f4405a84612a34ecf&query=";
const input = document.querySelector(".header__input");
const btn = document.querySelector(".fa-search");

response(API_URL)

btn.addEventListener('click', () => {
    input.classList.toggle("visiblity")
    if (input.value !== "") {
        input.classList.toggle("visiblity");
        search()
    }
});
input.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && e.value != "") {
        search()
    }
})

function search() {
    response(SEARCH_URL + input.value);
    document.querySelector(".main__cards").innerHTML = ""
    input.value = ""
}

function response(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.results.forEach((item, index) => {
                if (typeof item.poster_path != "string") {
                    item.poster_path = data.results[index + 1].poster_path;
                }
                new Movie(item).render()
            })
        })
}
class Movie {
    constructor(data) {
        this.src = data.poster_path
        this.title = data.original_title
        this.rating = data.vote_average
        this.description = data.overview
    }
    render() {
        if (this.description.length > 300) {
            this.description = this.description.slice(0, 300)
        }
        const newCard = document.createElement("div");
        newCard.innerHTML = `
        <div class="main__card-imgbox">
            <img src="${IMG_URL+this.src}" alt="image..">
        </div>
       <div class="main__card-info">
            <h2 class="main__card-title">${this.title}</h2>
        <span class="main__card-rating">${this.rating}</span>
       </div>
       <div class="card__overview">
           <h2 class="card__overview-title">
            Overview
           </h2>
           <p class="card__overview-description">
               ${this.description}
           </p>
       </div>
        `;
        newCard.classList.add("main__card");
        document.querySelector(".main__cards").appendChild(newCard)
    }
}