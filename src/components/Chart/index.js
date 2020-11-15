import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import classes from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgb(255, 230, 0)',
              'rgba(0, 255, 0, 0.979)',
              'rgb(255, 0, 0)'
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null;

  // Line chart is available only for US due to API limitation
  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: 'rgb(255, 230, 0)',
            fill: true
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgb(255, 0, 0)',
            fill: true
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.979)',
            fill: true
          }
        ]
      }}
    />
  ) : null;

  return (
    <div className={classes.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
