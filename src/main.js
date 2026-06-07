import './style.css'

const searchForm = document.getElementById("search-area-form"); // Grab the form
const searchInput = document.getElementById("searchInput");

const API_Read_Access_Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODczOTg4MjgzZDI0NGE0YjQ5ZDc4ZWUyNWFkYjc3NSIsIm5iZiI6MTc4MDY5NDczNy4zODMwMDAxLCJzdWIiOiI2YTIzM2VkMTAyZGVkOTUyNDE4ZTMzN2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xKbnTyWdf3prybT22tBXZeBmugrLqfElBvxWs5up_cA";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_Read_Access_Token}`
  }
};

// 'async' here so you can use 'await' inside
async function searchMovie(movieName) {
  try {
    // 'options' object here so the API knows you are authorized
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`, options);
    
    // 'await' the .json() parsing
    const data = await response.json(); 
    console.log(data);
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