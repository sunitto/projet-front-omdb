const searchBar = document.querySelector("#search-bar");
const resultsDisplay = document.querySelector("#results");
const apiKey = ""; // Remplacez par votre clé API OMDB


searchBar.addEventListener("submit", function(event) {
  event.preventDefault(); // Pour empêcher le rechargement de la page
  const input = searchBar.querySelector("input[name='query']");
  const query = input.value;
  input.value = ""; // Réinitialiser le champ de saisie après avoir récupérer la valeur
  const url = "https://www.omdbapi.com/?s=" + encodeURIComponent(query) + "&apikey=" + apiKey;
  fetch(url) //on fait une requête à l'API OMDB
    .then(response => response.json()) //puis une fois qu'on a la réponse, on la convertit en JSON
    .then(data => {
      if (data.Response === "True") { // si la réponse existe
        //création des cartes de film et affichage des résultats
        resultsDisplay.innerHTML = data.Search.map(movie => `
          <a href="details.html?id=${movie.imdbID}" class="movie-card">
            <div class="poster-container">
              <img src="${movie.Poster}" alt="${movie.Title} poster" />
            </div>
            <div class="movie-info">
              <p><strong>${movie.Title}</strong></p>
              <p>${movie.Year}</p>
            </div>
          </a>
        `).join("");
      } else {
        resultsDisplay.innerHTML = `<p>No results found for "${query}".</p>`;
      }
    })
    //message d'erreur si la requête échoue
    .catch(error => {
      console.error("Error fetching data:", error);
      resultsDisplay.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    });
});
