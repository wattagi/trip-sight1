

// Fetch the JSON data from the file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        window.data = data; // Store data globally
    })
    .catch(error => console.error('Error fetching the JSON data:', error));

// Search functionality
document.getElementById('searchButton').addEventListener('click', function () {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    let found = false;
    
    if (searchValue) {
        // Search in countries, temples, and beaches
        window.data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(searchValue)) {
                    displayRecommendation(city);
                    found = true;
                }
            });
        });

        if (!found) {
            window.data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(searchValue)) {
                    displayRecommendation(temple);
                    found = true;
                }
            });
        }

        if (!found) {
            window.data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(searchValue)) {
                    displayRecommendation(beach);
                    found = true;
                }
            });
        }

        if (!found) {
            alert('No results found.');
        }
    }
});

// Clear functionality
document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('searchBar').value = '';
    document.getElementById('recommendation').style.display = 'none';
});

// Function to display the recommendation based on search
function displayRecommendation(destination) {
    const recommendationDiv = document.getElementById('recommendation');
    document.getElementById('locationName').textContent = destination.name;
    document.getElementById('locationImage').src = destination.imageUrl;
    document.getElementById('locationDescription').textContent = destination.description;

    recommendationDiv.style.display = 'block';
}
