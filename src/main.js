import './style.css'

const searchForm = document.getElementById("search-area-form"); // Grab the form
const searchInput = document.getElementById("searchInput");
const searchResultsList = document.getElementById("search-results-list");

const API_Read_Access_Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODczOTg4MjgzZDI0NGE0YjQ5ZDc4ZWUyNWFkYjc3NSIsIm5iZiI6MTc4MDY5NDczNy4zODMwMDAxLCJzdWIiOiI2YTIzM2VkMTAyZGVkOTUyNDE4ZTMzN2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xKbnTyWdf3prybT22tBXZeBmugrLqfElBvxWs5up_cA";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_Read_Access_Token}`
  }
};

// 'async' here so use 'await' inside
async function searchMovie(movieName) {
  try {
    searchResultsList.innerHTML = "";
    // 'options' object here so the API knows you are authorized
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`, options);
    
    // 'await' the .json() parsing
    const data = await response.json(); 
    console.log(data);
    let searchResults = data.results;
    const cleanMovies = searchResults.filter(movie => movie.poster_path !== null);

    if(cleanMovies.length == 0){
      let li = document.createElement("li");
      li.textContent = "Film bulunamadı.";
      searchResultsList.appendChild(li);
    }
    
    else{
      cleanMovies.forEach(movie => {
      let li = document.createElement("li");
      li.className = "flex  flex-col items-center text-center gap-2 bg-neutral-800 p-3 rounded-lg shadow-lg w-48";
      li.innerHTML = `<img class="movie-poster object-cover w-48 h-72 bg-neutral-800 rounded-lg" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster"></img>
      <span class="truncate w-full">${movie.title}</span>`
      searchResultsList.appendChild(li);
      });
    }
  } catch (err) {
    console.error("Error fetching movie:", err);
  }

}


searchForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents the page from reloading
  
  const query = searchInput.value.trim();
  if (query) {
    searchMovie(query);
  }
});