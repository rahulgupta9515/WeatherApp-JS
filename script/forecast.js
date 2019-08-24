class Forecast{
    constructor(){
        this.key = 'keAwBIAbPJSGm6HcwO1hxOUhbjNeMRUn';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    async updateCity(city){
        const citydetails = await this.getCity(city);
        const weather = await this.getweather(citydetails.Key);
        return {citydetails, weather};
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`
        const response = await fetch(this.cityURI+query);
        const data = await response.json();
        return data[0];
    }

    async getweather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI+query);
        const data = await response.json();
        return data[0];
    }

}

//********************** Without OOPS ******************************//


// const key = 'keAwBIAbPJSGm6HcwO1hxOUhbjNeMRUn';

// const getweather = async (id) => {
//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query = `${id}?apikey=${key}`;
//     const response = await fetch(base+query);
//     const data = await response.json();
//     return data[0];
// }

// const getCity = async (city) =>{
//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`
//     const response = await fetch(base+query);
//     const data = await response.json();

//     return data[0];
// }

// getCity('delhi').then(data => {
//     return weather(data.Key);
// }).then(data =>{
//   console.log(data);
// }).catch(err => console.log(err));

