function CurrentWeather({
  city,
  current,
  currentInfo,
  unit,
  setUnit,
  convertTemperature,
}) {
  return (
    <>
      <div className="unit-switch">
        <span>Đơn vị nhiệt độ</span>

        <div className="unit-buttons">
          <button
            type="button"
            className={unit === "C" ? "selected" : ""}
            aria-pressed={unit === "C"}
            onClick={() => setUnit("C")}
          >
            °C
          </button>

          <button
            type="button"
            className={unit === "F" ? "selected" : ""}
            aria-pressed={unit === "F"}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>
      </div>

      <div className="current-weather">
        <div>
          <p className="city-label">Thời tiết hiện tại tại</p>
          <h2>{city.name}</h2>

          <p className="weather-description">
            {currentInfo.icon} {currentInfo.description}
          </p>
        </div>

        <div className="temperature">
          {convertTemperature(current.temperature_2m)}°{unit}
        </div>
      </div>

      <p className="updated-time">
        Thời điểm dữ liệu: {current.time.replace("T", " ")}
      </p>
    </>
  );
}

export default CurrentWeather;
