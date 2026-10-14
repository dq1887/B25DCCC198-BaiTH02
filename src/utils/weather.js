export async function getWeather(city) {
  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"].join(
      ",",
    ),
    forecast_days: "7",
    timezone: "Asia/Bangkok",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Không thể tải dữ liệu thời tiết.");
  }

  return response.json();
}
