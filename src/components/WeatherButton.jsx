// 버튼을 배열로
import React from "react";
import { Button } from "react-bootstrap";

//App에서 props로 받아옴
export default function WeatherButton({ cities, setCity, selectedCity }) {
	return (
		<div className="buttonBox">
			<Button
				variant={`${selectedCity === "" ? "danger" : "warning"}`}
				onClick={() => setCity("")}
			>
				Current Location
			</Button>
			{cities.map((item, index) => (
				<Button
					variant={`${selectedCity === item ? "danger" : "warning"}`}
					key={index}
					onClick={() => setCity(item)}
				>
					{item}
				</Button>
			))}
		</div>
	);
}
