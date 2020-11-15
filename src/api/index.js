import axios from 'axios';

// API to get global COVID-19 cases
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let modifiedUrl = url;

  // API to get country specific COVID-19 cases
  if (country) {
    modifiedUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(modifiedUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// Api to fetch daily statistics for US
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      'https://api.covidtracking.com/v1/us/daily.json'
    );

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({
      confirmed: positive,
      recovered,
      deaths: death,
      date
    }));
  } catch (error) {
    return error;
  }
};

// To get list of countries
export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
