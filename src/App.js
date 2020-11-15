import React, { useEffect, useState } from 'react';
import Cards from './components/Cards';
import CountryPicker from './components/CountryPicker';
import Chart from './components/Chart';
import classes from './App.module.css';
import { fetchData } from './api';

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    try {
      const fetchDataApi = async () => {
        const response = await fetchData();
        setData(response);
        console.log(response);
      };
      fetchDataApi();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={classes.container}>
      <Cards data={data} />
      <CountryPicker />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
