/*
  로딩 스피너 추가 (https://www.npmjs.com/package/react-spinners)
*/
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import DotLoader from "react-spinners/DotLoader";

function App() {
	const [weather, setWeather] = useState(null); //데이터 존재여부
	const [city, setCity] = useState(""); //버튼에서 선택한 도시
	const [loading, setLoading] = useState(false);
	const cities = ["London", "New York", "Bangkok", "Goyang-si"]; //버튼, 도시들을 배열로

	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			// console.log("현재 내 위치는?", lat, lon);
			getWeatherByCurrentLocation(lat, lon);
		});
	};

	const getWeatherByCurrentLocation = async (lat, lon) => {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0bf196800b7819496514bb605867a2f2&units=metric`;
		setLoading(true); //fetch 시작 전 로딩 보이기
		let response = await fetch(url); //비동기적,url을 호출해서 데이터를 가져올 때까지 기다려줘
		let data = await response.json();
		// fetch함수로 불러왔을 때는 그대로 사용할 수 없음,json()으로 변환
		setWeather(data);
		setLoading(false); //fetch 완료 후 로딩 숨김
	};

	// 선택된 도시의 날씨를 가져오는 함수
	const getWeatherByCity = async () => {
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0bf196800b7819496514bb605867a2f2`;
		setLoading(true); //fetch 시작 전 로딩 보이기
		let response = await fetch(url); //비동기적,url을 호출해서 데이터를 가져올 때까지 기다려줘
		let data = await response.json();
		// fetch함수로 불러왔을 때는 그대로 사용할 수 없음,json()으로 변환
		setWeather(data);
		setLoading(false); //fetch 완료 후 로딩 숨김
	};

	/*
    현재 위치에 대한 함수 따로 만드는 경우
    const handleCityChange = (city) => {
      if (city === "current") {
        setCity("");
      }
    };
  */

	useEffect(() => {
		if (city === "") {
			getCurrentLocation();
		} else {
			getWeatherByCity();
		}
	}, [city]);

	return (
		<>
			{loading ? (
				<div className="container">
					<DotLoader
						color="orange"
						loading={loading}
						size={40}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<div className="container">
					<WeatherBox weather={weather} />
					<WeatherButton
						cities={cities}
						setCity={setCity}
						selectedCity={city}
					/>
				</div>
			)}
		</>
	);
}

export default App;
