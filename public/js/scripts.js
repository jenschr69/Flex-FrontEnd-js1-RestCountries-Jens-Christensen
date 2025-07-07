// API - https://restcountries.com
// All countries - https://restcountries.com/v3.1/all - On load?
// Search by country name - https://restcountries.com/v3.1/name/{name}
// Search by language - https://restcountries.com/v3.1/lang/{language}
// Search by language or country - https://restcountries.com/v3.1/{searchType}/{searchPhrase} ?

// Get all
let searchType ="" , searchPhrase =""

function validateForm() {
    let x = document.forms["myForm"]["search"].value;
    if (x == "") {
        alert("searchphrase must be filled out");
        document.getElementById("searchResult").style.display="none"
        return false;
    }
}

let submitButton= document.querySelector("#submit")
submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("searchResult").style.display="block"
    validateForm()
    searchPhrase = document.getElementById("search").value
    searchType = document.getElementById("searchBy").value
    console.log(`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`);
    loadCountryAPI()
})

const loadCountryAPI = () =>{
    // fetch url of rest country from website
    fetch(`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`)
    .then(res => res.json())
    .then(data => displayCountries(data))
}

// displaying all countries
const displayCountries = (countries) =>{
    const container = document.getElementById('countries');
     if(!Array.isArray(countries)) {container.innerHTML="Nothing found..." ; return }

    // console.log(countries);
    //let countries = []

    //countries.sort( (a,b) => a.name.common < b.name.common)

    const countriesHTML = countries.map(country => getCountry(country));
    // displaying div to html
    container.innerHTML = countriesHTML.join(' ');
}

// get data and set it to html
function getCountry  (country) {
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
//loadCountryAPI()