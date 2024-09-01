
/*
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
} */

document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
});

document.getElementById("searchInput").addEventListener("input", async (e) => {
    const query = e.target.value.toLowerCase().trim();
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();

    let results = [];

    if (['beach', 'beaches'].includes(query)) {
        results = data.beaches;
    } else if (['temple', 'temples'].includes(query)) {
        results = data.temples;
    } else if (['country', 'countries'].includes(query)) {
        const dropdown = `<select id="countrySelect">
                            <option value="">Select a country...</option>
                            <option value="Australia">Australia</option>
                            <option value="Japan">Japan</option>
                            <option value="Brazil">Brazil</option>
                          </select>`;
        document.getElementById("results").innerHTML = dropdown;

        document.getElementById("countrySelect").addEventListener("change", (e) => {
            const country = e.target.value;
            if (country) {
                const countryData = data.countries.find(c => c.name === country);
                results = countryData ? countryData.cities : [];
                displayResults(results);
            }
        });
        return;
    }

    displayResults(results);
});

function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    results.forEach(item => {
        const resultItem = `<div class="result-item">
                              <h2>${item.name}</h2>
                              <img src="${item.imageUrl}" alt="${item.name}">
                              <p>${item.description}</p>
                            </div>`;
        resultsContainer.innerHTML += resultItem;
    });
}
