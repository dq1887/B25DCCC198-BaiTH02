function WeatherCard({ current, convertTemperature, unit }) {
  return (
    <div className="weather-details">
      <div className="detail-card">
        <span>🌡️</span>
        <p>Cảm giác như</p>
        <strong>
          {convertTemperature(current.apparent_temperature)}°{unit}
        </strong>
      </div>

      <div className="detail-card">
        <span>💧</span>
        <p>Độ ẩm</p>
        <strong>{current.relative_humidity_2m}%</strong>
      </div>

      <div className="detail-card">
        <span>💨</span>
        <p>Tốc độ gió</p>
        <strong>{current.wind_speed_10m} km/h</strong>
      </div>
    </div>
  );
}

export default WeatherCard;
