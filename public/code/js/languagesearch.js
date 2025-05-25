const languageInput = document.querySelector("#language-input")
const searchBox = document.querySelector("#search-box")
const countryDetailsElem = document.querySelector("#country-details")
const countryName = document.querySelector("#country-name")
const capitalTxt = document.querySelector("#capital-city")
const subregionTxt = document.querySelector("#subregion")
const populationTxt = document.querySelector("#population")
const flagImg = document.querySelector("#flag")
const errTxt = document.querySelector("#errorTxt")

async function getCountry(langName){
     const res = await fetch(`https://restcountries.com/v3.1/lang/${langName}`)
     const data = await res.json()
     return data.find(val=>val.name.common===langName) || data[0]
}
searchBox.addEventListener("submit",async e=>{
     e.preventDefault()
     if(countryInput.value.trim()===""){
          errTxt.textContent = "It is Required To Enter a Language To Search"
     } else {
          errTxt.textContent = ""
          try{
               const country = await getCountry(languageInput.value);
               const {name, capital, subregion, population, languages, continents, flags} = country
               countryName.textContent = name.common
               capitalTxt.textContent = capital.join(", ")
               subregionTxt.textContent = subregion
               populationTxt.textContent = population
               flagImg.src = flags.svg
               if(!countryDetailsElem.classList.contains("active"))
                    countryDetailsElem.classList.add("active")
          } catch{
               errTxt.textContent = "Language Not Found"
          }
     }
})