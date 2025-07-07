// API - https://restcountries.com
// All countries - https://restcountries.com/v3.1/all - On load?
// Search by country name - https://restcountries.com/v3.1/name/{name}
// Search by language - https://restcountries.com/v3.1/lang/{language}
// Search by language or country - https://restcountries.com/v3.1/{searchType}/{searchPhrase}

// Get all
const loadCountryAPI = () =>{
    // fetch url of rest country from website
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => displayCountries(data))
}

// displaying all countries
const displayCountries = countries =>{
    // console.log(countries);
    const countriesHTML = countries.map(country => getCountry(country));
    // displaying div to html
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
}

// get data and set it to html
const getCountry = (country) =>{
    console.log(country)
    return `
        <div class="country-div">
        <img src="${country.flags.png}">
        <h2>${country.name.common}</h2>
        <h4>Region: ${country.region}</h4>
        <h4>Capital: ${country.capital}</h4>
        <h4>Population: ${country.population}</h4>        
        </div>
    `
}
// call the funtion to get output in console
loadCountryAPI()