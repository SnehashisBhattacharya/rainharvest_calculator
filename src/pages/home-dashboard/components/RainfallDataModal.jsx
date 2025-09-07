import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ✅ Inline Modal
const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {title && (
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        )}
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  );
};

const RainfallDataModal = ({ isOpen, onClose }) => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState("");
  const [rainfallData, setRainfallData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // ✅ for dropdown

  // ✅ Detect current location on open
  useEffect(() => {
    if (isOpen && !location) {
      detectLocation();
    }
  }, [isOpen, location]);

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLocation({ lat, lon });
        await reverseGeocode(lat, lon);
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  };

  // ✅ Reverse geocode
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`
      );
      const data = await res.json();
      if (data?.results?.length) {
        setCityName(`${data.results[0].name}, ${data.results[0].country}`);
      }
    } catch (err) {
      console.error("Reverse geocode error:", err);
    }
  };

  // ✅ Fetch rainfall when location changes
  useEffect(() => {
    if (location) {
      fetchRainfall(location.lat, location.lon);
    }
  }, [location]);

  const fetchRainfall = async (lat, lon) => {
    setLoading(true);
    try {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2024-01-01&end_date=2024-12-31&daily=precipitation_sum&timezone=auto`;
      const res = await fetch(url);
      const data = await res.json();

      if (data?.daily?.time) {
        const monthly = {};
        data.daily.time.forEach((date, i) => {
          const month = date.slice(0, 7);
          monthly[month] =
            (monthly[month] || 0) + data.daily.precipitation_sum[i];
        });

        const chartData = Object.entries(monthly).map(([month, value]) => ({
          month,
          rainfall: Number(value.toFixed(1)),
        }));

        setRainfallData(chartData);
      }
    } catch (err) {
      console.error("Error fetching rainfall:", err);
    }
    setLoading(false);
  };

  // ✅ Search city suggestions (live as you type)
  const handleCityInput = async (value) => {
    setCity(value);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${value}`;
      const res = await fetch(geoUrl);
      const data = await res.json();
      if (data?.results?.length) {
        setSuggestions(data.results.slice(0, 5)); // max 5
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("City suggestion error:", err);
    }
  };

  // ✅ Select city from dropdown
  const handleSelectCity = (selected) => {
    setCity(selected.name);
    setCityName(`${selected.name}, ${selected.country}`);
    setLocation({ lat: selected.latitude, lon: selected.longitude });
    setSuggestions([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rainfall in Your City"
      subtitle={cityName ? `Showing data for: ${cityName}` : ""}
    >
      <div className="p-4">
        {/* 🔍 City Search + Use Current Location */}
        <div className="relative flex flex-col md:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => handleCityInput(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-50 bg-white border rounded shadow-md mt-1 w-full max-h-40 overflow-y-auto">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelectCity(s)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {s.name}, {s.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={detectLocation}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Use Current Location
          </button>
        </div>

        {/* ⏳ Loading */}
        {loading && <p>Loading rainfall data...</p>}

        {/* 📊 Rainfall Data as Chart */}
        {!loading && rainfallData.length > 0 && (
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  label={{ value: "mm", angle: -90, position: "insideLeft" }}
                />
                <Tooltip formatter={(value) => `${value} mm`} />
                <Bar dataKey="rainfall" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ❌ No data */}
        {!loading && rainfallData.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No rainfall data available. Try searching for a city or use your
            current location.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default RainfallDataModal;
