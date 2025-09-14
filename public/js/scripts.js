// API - https://restcountries.com
// All countries - https://restcountries.com/v3.1/all 
// Search by country name - https://restcountries.com/v3.1/name/{name}
// Search by language - https://restcountries.com/v3.1/lang/{language}
// Search by language or country - https://restcountries.com/v3.1/{searchType}/{searchPhrase}

// Get all
let searchType ="" , searchPhrase =""

function validateForm() {
    let x = document.forms["myForm"]["search"].value;
    if (x == "") {
        // alert("Search phrase must be filled out");
        // document.getElementById("searchErrorMessage").style.display="block";
        let searchErrorMessage = '';
        document.getElementById("error").style.display="block";
        document.getElementById("error").innerHTML=`<p style="color:red;">Search phrase must be filled out</p>`;
        document.getElementById("searchResult").style.display="none";
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

// Kommentera ut kod ctrl+k+c
// Avkommentera ctrl+k+u
// const loadCountryAPI = () =>{
//     // fetch url of rest country from website
//     var res = fetch(`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`)
//     .then(res => res.json())
//     .then(data => displayCountries(data));
// }

async function loadCountryAPI() {
  const url =`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`;
  try {
    const response = await fetch(url);

    if (response.status == 500) {
        // do I need to add: "document.getElementById("error").style.display="block";" to make the div visible?
        const container = document.getElementById('errors');
        container.innerHTML=`<p style="color:red;">Error: ${response.status} - ${response.statusText}</p>`;
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    displayCountries(result);
    
  } catch (error) {
    console.error(error.message);
  }
}

// async function loadCountryAPI() {
//   const url =`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`;
//   try {
//     const response = await fetch(url);
//     // if (response.status === 500) {
//     //   const container = document.getElementById('errors');
//     //     container.innerHTML=`<p style="color:red;">Error: ${response.status} - ${response.statusText}</p>`;
//     //     throw new Error(`HTTP error! status: ${response.status}`);
//     // }
//     const result = await response.json();
//     console.log(result);
//     displayCountries(result);
    
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// Displaying Countries
const displayCountries = (countries) => {
    let searchErrorMessage = '';
    if (searchType == 'name') {
        searchErrorMessage = 'No country found with that name...';
    } else if (searchType == 'lang') {
         searchErrorMessage = 'No country found with that language...';
    }
    else {
        searchErrorMessage = 'Something went wrong...';
    }
    const container = document.getElementById('countries');
    if(!Array.isArray(countries)) {container.innerHTML= searchErrorMessage; return }
    // Sort by population - Acending
    // countries.sort( (a,b) => b.population < a.population);

    // Sort by population - Decending
    countries.sort( (a,b) => a.population < b.population);

    // Sort by country name - Acending
    // countries.sort( (a,b) => b.name.common < a.name.common)

    // Sort by country name - Decending
    // countries.sort( (a,b) => a.name.common < b.name.common)

    const countriesHTML = countries.map(country => getCountry(country));

    // displaying div to html
    container.innerHTML = countriesHTML.join(' ');
}

// get data and set it to html
function getCountry  (country) {
    // console.log(country)
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