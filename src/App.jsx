import { useEffect, useState } from "react";
import { cities } from "./data/cities";
import { getWeather } from "./utils/weather";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import "./App.css";

function getCurrentWeatherInfo(code, isDay = 1) {
  if (code === 0) {
    return {
      icon: isDay ? "☀️" : "🌙",
      description: isDay ? "Trời quang" : "Trời quang, ban đêm",
    };
  }

  if (code === 1) return { icon: "🌤️", description: "Trời khá quang" };
  if (code === 2) return { icon: "⛅", description: "Có mây từng đợt" };
  if (code === 3) return { icon: "☁️", description: "Trời nhiều mây" };

  if (code === 45 || code === 48) {
    return { icon: "🌫️", description: "Sương mù" };
  }

  if (code >= 51 && code <= 57) {
    return { icon: "🌦️", description: "Mưa phùn" };
  }

  if (code >= 61 && code <= 67) {
    return { icon: "🌧️", description: "Trời mưa" };
  }

  if (code >= 71 && code <= 77) {
    return { icon: "❄️", description: "Tuyết rơi" };
  }

  if (code >= 80 && code <= 82) {
    return { icon: "🌦️", description: "Mưa rào" };
  }

  if (code === 85 || code === 86) {
    return { icon: "🌨️", description: "Mưa tuyết" };
  }

  if (code >= 95) {
    return { icon: "⛈️", description: "Dông" };
  }

  return { icon: "🌡️", description: "Chưa xác định" };
}

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    if (!selectedCity) return;

    let cancelled = false;

    async function loadWeather() {
      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const data = await getWeather(selectedCity);

        if (!cancelled) {
          setWeather(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Đã xảy ra lỗi khi tải thời tiết.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [selectedCity, reloadKey]);

  const current = weather?.current;
  const daily = weather?.daily;

  const currentInfo = current
    ? getCurrentWeatherInfo(current.weather_code, current.is_day)
    : null;

  function convertTemperature(celsius) {
    if (unit === "F") {
      return Math.round((celsius * 9) / 5 + 32);
    }

    return Math.round(celsius);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Weather Vietnam</h1>
        <p>Theo dõi thời tiết các thành phố Việt Nam</p>
      </header>

      <main className="weather-layout">
        <CityList
          cities={cities}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
        />

        <section className="weather-content">
          {!selectedCity && (
            <div className="status-message">
              <span className="status-icon">🌤️</span>
              <h2>Chào mừng!</h2>
              <p>Chọn một thành phố để xem thời tiết.</p>
            </div>
          )}

          {selectedCity && loading && (
            <div className="status-message">
              <p>⏳ Đang tải dữ liệu thời tiết...</p>
              <p>{selectedCity.name}</p>
            </div>
          )}

          {selectedCity && error && !loading && (
            <div className="status-message">
              <h2>Không tải được dữ liệu</h2>
              <p>{error}</p>
              <button
                type="button"
                className="retry-button"
                onClick={() => setReloadKey((key) => key + 1)}
              >
                Thử lại
              </button>
            </div>
          )}

          {selectedCity &&
            weather &&
            !loading &&
            !error &&
            current &&
            daily && (
              <>
                <CurrentWeather
                  city={selectedCity}
                  current={current}
                  currentInfo={currentInfo}
                  unit={unit}
                  setUnit={setUnit}
                  convertTemperature={convertTemperature}
                />

                <WeatherCard
                  current={current}
                  unit={unit}
                  convertTemperature={convertTemperature}
                />

                <ForecastList
                  daily={daily}
                  convertTemperature={convertTemperature}
                />
              </>
            )}
        </section>
      </main>
    </div>
  );
}

export default App;
