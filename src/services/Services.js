
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchWeaterByCoord = async (lat, lon) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sv`
    )
    if (!res.ok) throw new Error("Kunde inte hämta väderdata från din plats")
        return await res.json();
}


export const fetchWeatherByCity = async (city) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sv`
    )
    if (!res.ok) throw new Error("Kunde inte hämta väderdata för din stad")
        return await res.json();
}

