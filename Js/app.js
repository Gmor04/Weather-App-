

let cityForm = document.querySelector('.change-location');
let card = document.querySelector('.card');
let details = document.querySelector('.details');
let time = document.querySelector('img.time');
let icon  = document.querySelector('.icon img');


const updateUI = (data) => {
     console.log(data);
    const citydetails = data.citydetails;
    const weatherdetail = data.weatherdetail;

    //destruture properties
    // const { citydetails, weatherdetail} = data

    //update details temple
    details.innerHTML = `
                <h5 class="my-3">${citydetails.EnglishName}</h5>
                <div class="my-3">${weatherdetail.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weatherdetail.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    
    `

    //Update the icon images
    const iconSrc = `img/icons/${weatherdetail.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)


    //update the night/day & icon image

   // using ternary operator
//    (let timeSrc = weatherdetail.IsDayTime ? 'img/day.svg' : 'img/night.svg')

    let timeSrc = null;
    if (weatherdetail.IsDayTime) {
        timeSrc = 'img/day.svg'
    } else {
        timeSrc = 'img/night.svg'
    }

time.setAttribute('src', timeSrc);

// remove the d-none class if present
if (card.classList.contains('d-none')) {
    card.classList.remove('d-none')
} 

};




const updateCity = async (city) => {
 
    const citydetails = await getCity(city);

    const weatherdetail = await getWeather(citydetails.Key);

    return {
        citydetails: citydetails,
        weatherdetail: weatherdetail
    };

    //object shorthand notation
    // return {
    //     citydetails,
    //     weatherdetail
    // }

}

cityForm.addEventListener('submit', e => {
// preventDefault
e.preventDefault();

let city = cityForm.city.value.trim();

cityForm.reset();


//update the ui with the new city

updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err));

})