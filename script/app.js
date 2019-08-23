const cityform = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details'); 
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) =>{
    // const city = data.citydetails;
    // const weather = data.weather;

    const { citydetails, weather } = data;

    details.innerHTML = `
    <h5 class="my-3">${citydetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>  
    `;

    const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconsrc)

    let timesrc = null;
    if(weather.IsDayTime){
        timesrc = 'img/day.svg';
    }else{
        timesrc = 'img/night.svg'
    }  

    time.setAttribute('src', timesrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}


const updateCity = async city =>{
    // console.log(city);
    const citydetails = await getCity(city);
    const weather = await getweather(citydetails.Key);
    return {citydetails, weather};
    
}

cityform.addEventListener('submit', e=>{
    e.preventDefault();
    const city = cityform.city.value.trim();
    cityform.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

   localStorage.setItem('city', city); 
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}