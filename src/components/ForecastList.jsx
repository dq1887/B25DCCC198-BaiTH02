function getWeatherInfo(code) {
  if (code === 0) return { icon: "☀️", description: "Trời quang" };
  if (code === 1) return { icon: "🌤️", description: "Trời khá quang" };
  if (code === 2) return { icon: "⛅", description: "Có mây từng đợt" };
  if (code === 3) return { icon: "☁️", description: "Trời nhiều mây" };
  if (code === 45 || code === 48)
    return { icon: "🌫️", description: "Sương mù" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", description: "Mưa phùn" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", description: "Trời mưa" };
  if (code >= 71 && code <= 77) return { icon: "❄️", description: "Tuyết rơi" };
  if (code >= 80 && code <= 82) return { icon: "🌦️", description: "Mưa rào" };
  if (code === 85 || code === 86)
    return { icon: "🌨️", description: "Mưa tuyết" };
  if (code >= 95) return { icon: "⛈️", description: "Dông" };

  return { icon: "🌡️", description: "Chưa xác định" };
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  return {
    weekday: new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
    }).format(date),
    date: new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    }).format(date),
  };
}

function ForecastList({ daily, convertTemperature }) {
  return (
    <>
      <h2 className="forecast-heading">Dự báo 7 ngày</h2>

      <div className="forecast-list">
        {daily.time.map((date, index) => {
          const dayInfo = formatDate(date);
          const info = getWeatherInfo(daily.weather_code[index]);

          return (
            <div className="forecast-card" key={date}>
              <div className="forecast-date">
                <strong>{dayInfo.weekday}</strong>
                <span>{dayInfo.date}</span>
              </div>

              <span
                className="forecast-icon"
                title={info.description}
                aria-label={info.description}
              >
                {info.icon}
              </span>

              <div className="forecast-temperatures">
                <strong>
                  {convertTemperature(daily.temperature_2m_max[index])}°
                </strong>
                <span>
                  {convertTemperature(daily.temperature_2m_min[index])}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ForecastList;
