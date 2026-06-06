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

// Added 'async' here so you can use 'await' inside
async function searchMovie(movieName) {
  try {
    // Added the 'options' object here so the API knows you are authorized
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`, options);
    
    // You must 'await' the .json() parsing as well
    const data = await response.json(); 
    console.log(data);
  } catch (err) {
    console.error("Error fetching movie:", err);
  }
}

// Listen to the form submit event instead of just the button click. 
// This handles both clicking the button AND pressing 'Enter'.
searchForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents the page from reloading
  
  const query = searchInput.value.trim();
  if (query) {
    searchMovie(query);
  }
});