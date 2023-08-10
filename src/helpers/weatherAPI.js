// Remova os comentários a medida que for implementando as funções
//
const TOKEN = 'cedc300c832d4550b09124423230908';

export const searchCities = async (term) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${term}`);
    const data = await response.json();

    if (data.length === 0) {
      window.alert('Nenhuma cidade encontrada');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return [];
  }
};
export const getWeatherByCity = async (cityURL) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`);
    const data = await response.json();

    const weatherData = {
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
    };

    return weatherData;
  } catch (error) {
    console.error('Erro ao obter o clima:', error);
    return null;
  }
};

export const get7DayForecast = async (cityURL) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${cityURL}&days=7`);
    const data = await response.json();

    const forecastData = data.forecast.forecastday.map((forecast) => ({
      date: forecast.date,
      maxTemp: forecast.day.maxtemp_c,
      minTemp: forecast.day.mintemp_c,
      condition: forecast.day.condition.text,
      icon: forecast.day.condition.icon,
    }));

    return forecastData;
  } catch (error) {
    console.error('Erro ao obter a previsão do tempo:', error);
    return [];
  }
};
