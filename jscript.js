//72bf0b477b905503727d7113d54031c9

const weatherApi={
	key:"72bf0b477b905503727d7113d54031c9",
	baseurl:"http://api.openweathermap.org/data/2.5/weather",
	imageurl:"http://openweathermap.org/img/wn/"
}

const searchInputBox=document.getElementById('input-box');

// Evenet Listener Function on Keypress
searchInputBox.addEventListener('keypress',(event)=>{

	if(event.keyCode==13){
		console.log(searchInputBox.value);
		getWeatherReport(searchInputBox.value);
		document.querySelector('.weather-body').style.display="block";
	}
});

//Get Weather Report
function getWeatherReport(city) {
	fetch(`${weatherApi.baseurl}?q=${city}&appid=${weatherApi.key}&units=metric`)
	.then(weather=>{
		return weather.json();
	}).then(showWeatherReport);
}



//Show Weather Report
function showWeatherReport(weather){
	console.log(weather);

	let city = document.getElementById('city');
	city.innerText=`${weather.name},${weather.sys.country}`;

	let temperature = document.getElementById('temp');
	temperature.innerHTML=`${Math.round(weather.main.temp)}&degC`;

	let feelLike=document.getElementById('feeltemp');
	feelLike.innerHTML=`Feel_like: ${Math.floor(weather.main.feels_like)}&degC`;

	let minMaxTemp=document.getElementById('mtemp');
	minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min)}&degC (min)/${Math.floor(weather.main.temp_max)}&degC (max)`;

	let weatherType=document.getElementById('status');
	weatherType.innerText=`Status: ${weather.weather[0].main}`;

	let windSpeed=document.getElementById('windspeed');
	windSpeed.innerHTML=`Wind Speed: ${Math.floor(weather.wind.speed)}km/h`;

	let humidity=document.getElementById('humidity');
	humidity.innerHTML=`Humidity: ${Math.floor(weather.main.humidity)}%`;

	let weatherIcon=document.getElementById('icon');
	weatherIcon.src=weatherApi.imageurl+weather.weather[0].icon+".png";
	console.log(weatherIcon.src)
	
	let date=document.getElementById('date');
	let todayDate=new Date();
	date.innerText=dateManage(todayDate);

	console.log(weatherType.textContent);
	if(weather.weather[0].main == 'Clear'){
		document.body.style.backgroundImage = "url(assets/clear.jpg)";
	}
	else if(weather.weather[0].main == 'Clouds'){
		document.body.style.backgroundImage = "url(assets/cloudy.jpg)";
	}
	else if(weather.weather[0].main == 'Drizzle'){
		document.body.style.backgroundImage = "url(assets/drizzle.jpeg)";
	}
	else if(weather.weather[0].main == 'Haze'){
		document.body.style.backgroundImage = "url(assets/haze.jpg)";
	}
	else if(weather.weather[0].main == 'Mist'){
		document.body.style.backgroundImage = "url(assets/Mist.jpg)";
	}
	else if(weather.weather[0].main == 'Rain'){
		document.body.style.backgroundImage = "url(assets/rainy.jpg)";
	}
	else if(weather.weather[0].main == 'Snow'){
		document.body.style.backgroundImage = "url(assets/snowy.jpg)";
	}
	else if(weather.weather[0].main == 'Thunderstorm'){
		document.body.style.backgroundImage = "url(assets/Thunderstorm.jpeg)";
	}


}
//Date manage
function dateManage(dateArg){
	let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

	let months=["January","February","March","April","May","June","July","August","September","October","November","December"];

	let year=dateArg.getFullYear();
	let month=months[dateArg.getMonth()];
	let date=dateArg.getDate();
	let day=days[dateArg.getDay()];

	return `${date} ${month} (${day}), ${year}`;

}
