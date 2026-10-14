function CityList({ cities, selectedCity, onSelectCity }) {
  return (
    <aside className="city-list">
      <h2>Thành phố</h2>

      {cities.map((city) => (
        <button
          key={city.id}
          type="button"
          className={`city-item ${
            selectedCity?.id === city.id ? "active" : ""
          }`}
          onClick={() => onSelectCity(city)}
          aria-pressed={selectedCity?.id === city.id}
        >
          {city.name}
        </button>
      ))}
    </aside>
  );
}

export default CityList;
