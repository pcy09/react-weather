import React from "react";

// props 대신 destructuring(구조분해)
export default function WeatherBox({ weather }) {
	return (
		<div className="weatherBox">
			<div className="h5">지역 : {weather?.name} </div>
			<h2 className="text-warning h2">
				온도 : {weather?.main.temp} / 풍속 : {weather?.wind.speed}
			</h2>
			<h3 className="h4">{weather && weather.weather[0].description}</h3>
		</div>
	);
}
