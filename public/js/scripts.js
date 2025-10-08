// API - https://restcountries.com
// All countries - https://restcountries.com/v3.1/all 
// Search by country name - https://restcountries.com/v3.1/name/{name}
// Search by language - https://restcountries.com/v3.1/lang/{language}
// Search by language or country - https://restcountries.com/v3.1/{searchType}/{searchPhrase}

// Get all
let searchType ="" , searchPhrase =""

// Error message for empty search - Does this need to be specific for country and language
// Can this be replaced by adding the "required" option to the form? - Clara
// This function is displaying an error for both Country and Language
function validateForm() {
    let x = document.forms["myForm"]["search"].value;
    if (x == "") {
        let searchErrorMessage = '';
        document.getElementById("emptySearchErrorMessage").style.display="block";
        document.getElementById("emptySearchErrorMessage").innerHTML=`<p style="color:red;">Search phrase must be filled out</p>`;
        document.getElementById("searchResult").style.display="none";
        document.getElementById("error").style.display="none";
        return false;
    }
    return true;
}

let submitButton= document.querySelector("#submit")
submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("emptySearchErrorMessage").style.display="none"
    document.getElementById("error").style.display="none"
    document.getElementById("searchResult").style.display="block"
    const isvalid =  validateForm()
    console.log(isvalid);
    searchPhrase = document.getElementById("search").value
    searchType = document.getElementById("searchBy").value
    // console.log(`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`);
    if (isvalid) loadCountryAPI()
})

// This function is handling errors connecting to the api
async function loadCountryAPI() {
  const url =`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`;
  try {
    const response = await fetch(url);
    console.log(response.status);

    if (response.status >= 400) {
        // do I need to add: "document.getElementById("error").style.display="block";" to make the div visible?
        //const container = document.getElementById('errors');
        //container.innerHTML=`<p style="color:red;">Error: ${response.status} - ${response.statusText}</p>`;
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    else if (response.status >= 500) {
    // const container = document.getElementById('errors');
    // container.innerHTML=`<p style="color:red;">Error: ${response.status} - ${response.statusText}</p>`;
    throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    displayCountries(result);

    
    } catch (error) {
        console.log('error')
    // console.error(error.message); 
    const container = document.getElementById('error');
    // Error message not displayed because the block is not visible
    document.getElementById("error").style.display="block"
    // container.innerHTML=`<p style="color:red;">Error: ${response.status} - ${response.statusText}</p>`;
    container.innerHTML=`<p style="color:red; padding-left:2rem;">No results found</p>`;
  }
}

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

    // Sort by population - Decending
    countries.sort( (a,b) => a.population < b.population);

    const countriesHTML = countries.map(country => getCountry(country));

    // displaying div to html
    container.innerHTML = countriesHTML.join(' ');
}

// Get data and add it to html
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
