import React, { useEffect, useState } from 'react';
import Cards from './components/Cards';
import CountryPicker from './components/CountryPicker';
import Chart from './components/Chart';
import classes from './App.module.css';
import { fetchData } from './api';

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  // API to fetch total global COVID-19 cases
  useEffect(() => {
    try {
      const fetchDataApi = async () => {
        const response = await fetchData();
        setData(response);
      };
      fetchDataApi();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleCountryChange = async (selectedCountry) => {
    const fetchedData = await fetchData(selectedCountry);

    setData(fetchedData);
    setCountry(selectedCountry);
    console.log(selectedCountry);
  };

  return (
    <div className={classes.container}>
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
