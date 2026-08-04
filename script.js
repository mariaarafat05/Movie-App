
const API_KEY = "a2b78c45b07a7485a1bb42532ceb2e9e";

const BASE_URL = "https://api.themoviedb.org/3";

let favorites = JSON.parse(localStorage.getItem("favorites"));

if (!Array.isArray(favorites)) {
    favorites = [];
}



const movies = [
    {
        title: "The Legend of Zorro",
        image:"images/Zorro.jpg",
        rating:"6.0",
        year:"2005",
        duration:"2h 10m",
        age:"PG +18",
        description:"The Legend of Zorro is a 2005 American Western swashbuckler film directed by Martin Campbell.",
        trailer:"https://youtu.be/g849cy0Lmx4?si=JKW-njA6fqP0Oooi"
    },

    {
        title: "The Avengers",
        image:"images/Avengers.jpg",
        rating:"8.0",
        year:"2012",
        duration:"2h 23m",
        age:"PG +18",
        description:"The Avengers is a 2012 American superhero film based on the Marvel Comics superhero team the Avengers.",
        trailer:"https://youtu.be/T0-uoVFBtv0?si=c8Mqq4_UOYBWKUH3"
    },

    {
        title: "Inception",
        image:"images/Inception.jpg",
        rating:"8.8",
        year:"2010",
        duration:"2h 28m",
        age:"PG +18",
        description:"Inception is a 2010 science fiction action film.The film was written and directed by Christopher Nolan.",
        trailer:"https://youtu.be/FiM51gvvW_s?si=4c-CYvx9ptbHoP6H"
    },

    {
        title: "Flipped",
        image:"images/Flipped.jpg",
        rating:"8.4",
        year:"2010",
        duration:"1h 30m",
        age:"PG +12",
        description:"Flipped is a 2010 American romantic comedy-drama film co-written and directed by Rob Reiner.",
        trailer:"https://youtu.be/cgv5TBbNik4?si=Yp0PPlXE8Lfdx43E"
    },

];



let currentMovie = 0;


const heroTrailerBtn = document.getElementById("hero-trailer");
const title = document.querySelector("#movie-title");
const rating = document.querySelector("#movie-rating");
const year = document.querySelector("#movie-year");
const duration = document.querySelector("#movie-duration");
const age = document.querySelector("#movie-age");
const description = document.querySelector("#movie-description");
const detailsBtn = document.querySelector("#details-btn");
const modal = document.querySelector("#movie-modal");
const closeBtn = document.querySelector(".close");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalRating = document.querySelector("#modal-rating");
const modalYear = document.querySelector("#modal-year");
const modalDuration = document.querySelector("#modal-duration");
const modalDescription = document.querySelector("#modal-description");
const searchIcon = document.querySelector("#search-icon");
const homePage = document.querySelector("#home-page");
const searchPage = document.querySelector("#search-page");
const homeIcon = document.querySelector("#home-icon");
const favoritesIcon = document.querySelector("#favorites-icon");
const favoritesPage = document.querySelector("#favorites-page");
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const watchTrailerBtn = document.getElementById("watch-trailer");
const dots = document.querySelectorAll(".dot");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");


function showMovie() {
    const movie = movies[currentMovie];

    title.textContent = movie.title;
    rating.textContent = movie.rating;
    year.textContent = movie.year;
    duration.textContent = movie.duration;
    age.textContent = movie.age;
    description.textContent = movie.description;

    heroTrailerBtn.style.backgroundImage = `url(${movie.image})`;

    heroTrailerBtn.onclick = () => {
        window.open(movie.trailer, "_blank");
    };

    detailsBtn.onclick = () => {

        modal.style.display = "flex";

        modalImage.src = movie.image;
        modalTitle.textContent = movie.title;
        modalRating.textContent = "⭐ " + movie.rating;
        modalYear.textContent = movie.year;
        modalDuration.textContent = movie.duration;
        modalDescription.textContent = movie.description;
    };

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentMovie].classList.add("active");
}



showMovie();

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {

        currentMovie = index;
        showMovie();

    });

});

setInterval(() => {

    currentMovie++;

    if (currentMovie >= movies.length) {
        currentMovie = 0;
    }

    showMovie();

}, 5000);

closeBtn.onclick = () => {
    modal.style.display = "none";
};


searchIcon.addEventListener("click", (event) => {

    event.preventDefault();

    homePage.style.display = "none";
    searchPage.style.display = "block";

});

homeIcon.addEventListener("click", (event) => {

    event.preventDefault();

    searchPage.style.display = "none";
    favoritesPage.style.display = "none"
    homePage.style.display = "block";

});


favoritesIcon.addEventListener("click", (event) => {

    event.preventDefault();

    homePage.style.display = "none";
    favoritesPage.style.display = "block";

});


favoriteButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        const index = button.dataset.index;

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        if (!favorites.includes(movies[index])) {
            favorites.push(movies[index]);
}


    });

});



async function getPopularMovies() {

    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

    const data = await response.json();

    const popularMovies = document.querySelector("#popular-movies");

data.results.forEach((movie) => {

    popularMovies.innerHTML += `
    
        <div class="movie-card" data-id="${movie.id}">

            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">

            <button class="favorite-btn" data-id="${movie.id}">
                 <i class="fa-regular fa-heart"></i>
            </button>

            <div class="movie-info">

                <h1>${movie.title}</h1>

                <div class="movie-meta">

                    <i class="fa-solid fa-star"></i>
                    <span>${movie.vote_average.toFixed(1)}</span>
                    <span>${movie.release_date.substring(0,4)}</span>

                </div>

            </div>

        </div>

    `;

});

addMovieEvents();

    

}



async function getTopRatedMovies() {

    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);

    const data = await response.json();

    const topRatedMovies = document.querySelector("#top-rated-movies");

    data.results.forEach((movie) => {

        topRatedMovies.innerHTML += `

            <div class="movie-card" data-id="${movie.id}">

                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">

                <button class="favorite-btn" data-id="${movie.id}">
                    <i class="fa-regular fa-heart"></i>
                </button>

                <div class="movie-info">

                    <h1>${movie.title}</h1>

                    <div class="movie-meta">

                        <i class="fa-solid fa-star"></i>
                        <span>${movie.vote_average.toFixed(1)}</span>
                        <span>${movie.release_date.substring(0,4)}</span>

                    </div>

                </div>

            </div>

        `;

    });

addMovieEvents();

}



async function getMovieDetails(id) {

    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

    const movie = await response.json();

    modal.style.display = "flex";

    modalImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    modalTitle.textContent = movie.title;
    modalRating.textContent = "⭐ " + movie.vote_average.toFixed(1);
    modalYear.textContent = movie.release_date.substring(0,4);
    modalDuration.textContent = movie.runtime + " min";
    modalDescription.textContent = movie.overview;

    const videoResponse = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);

    const videoData = await videoResponse.json();

    const trailer = videoData.results.find(video =>
    video.type === "Trailer" && video.site === "YouTube"
);

    if (trailer) {
        watchTrailerBtn.href = `https://www.youtube.com/watch?v=${trailer.key}`;
    
}   else {
        watchTrailerBtn.href = "#";
}

}




function addMovieEvents() {

    const cards = document.querySelectorAll(".movie-card");

    cards.forEach((card) => {

        card.addEventListener("click", () => {

            const id = card.dataset.id;

            getMovieDetails(id);

        });

    });

    addFavoriteEvents();

}


function addFavoriteEvents() {

    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach((button) => {

        button.onclick = (e) => {

            e.stopPropagation();

            const icon = button.querySelector("i");

            const card = button.closest(".movie-card");

            const movieId = card.dataset.id;

            if (icon.classList.contains("fa-regular")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                if (!favorites.includes(movieId)) {

                    favorites.push(movieId);
                }

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                favorites = favorites.filter(id => id !== movieId);

            }

            localStorage.setItem("favorites", JSON.stringify(favorites));

            loadFavorites();

        };

    });

}



async function loadFavorites() {

    const favoritesContainer = document.querySelector("#favorites-movies");

    favoritesContainer.innerHTML = "";

    for (const id of favorites) {

        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

        const movie = await response.json();

    favoritesContainer.innerHTML += `

    <div class="favorite-item">

        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">

    <div class="favorite-info">

        <h2>${movie.title}</h2>

        <div class="favorite-meta">
            <span>⭐ ${movie.vote_average.toFixed(1)}</span>
            <span>${movie.release_date.substring(0,4)}</span>
        </div>

        <button class="remove-btn" data-id="${movie.id}">
            ❤️ Remove
        </button>

    </div>

    </div>

    `;

}

    document.querySelectorAll(".remove-btn").forEach((button) => {

        button.addEventListener("click", () => {

            favorites = favorites.filter(id => id != button.dataset.id);

            localStorage.setItem("favorites", JSON.stringify(favorites));

            loadFavorites();

        });

    });

}



async function searchMovies(query) {

    if (query.trim() === "") {

        searchResults.innerHTML = "";
        return;

    }

    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await response.json();

    searchResults.innerHTML = "";

    data.results.forEach((movie) => {

        searchResults.innerHTML += `

<div class="movie-card favorite-item" data-id="${movie.id}">

    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">

    <div class="favorite-info">

        <h2>${movie.title}</h2>

        <div class="favorite-meta">
            <span>⭐ ${movie.vote_average.toFixed(1)}</span>
            <span>${movie.release_date ? movie.release_date.substring(0,4) : "----"}</span>
        </div>

    </div>

</div>

`;

    });

    addMovieEvents();

}

searchInput.addEventListener("input", () => {

    searchMovies(searchInput.value);

});

getPopularMovies();
getTopRatedMovies();
loadFavorites();