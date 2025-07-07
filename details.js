const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get("id");
const apiKey = "8096bc5a"; // Remplacez par votre clé API OMDB
fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (data.Response === "True") {
    // on remplit la page details avec les informations du film
    const movieTitle = document.querySelector("#movie-title");
    const movieYear = document.querySelector("#movie-year");
    const movieGenre = document.querySelector("#movie-genre");
    const movieDirector = document.querySelector("#movie-director");
    const movieActors = document.querySelector("#movie-actors");
    const moviePlot = document.querySelector("#movie-plot");
    const moviePoster = document.querySelector("#movie-poster");

    movieTitle.textContent = data.Title;
    movieYear.textContent = data.Year;
    movieGenre.textContent = data.Genre;
    movieDirector.innerHTML = `by <strong>${data.Director}</strong>`;
    // on met le nom du réalisateur en gras
    const actors = data.Actors.split(", ").map(name => name.trim());
    // on sépare les acteurs par des virgules et on les met dans un tableau
    movieActors.innerHTML = `with ${actors.map(name => `<strong>${name}</strong>`).join(', ')}`;
    // on affiche les acteurs en gras
    moviePlot.textContent = data.Plot;
    moviePoster.src = data.Poster;
    } else {
      console.error("Movie not found:", data.Error);
      alert("Movie not found. Please try another search.");
    }
  })
  .catch(error => {
  console.error("Error fetching movie details:", error);
  alert("Error fetching movie details. Please try again later.");
  });
