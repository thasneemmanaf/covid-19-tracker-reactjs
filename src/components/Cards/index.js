import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from '../CardComponent';
import classes from './Cards.module.css';

function Cards({ data: { confirmed, recovered, deaths, lastUpdate } }) {
  if (!confirmed) {
    return 'Loading...';
  }

  return (
    <div className={classes.container}>
      <Typography gutterBottom color="primary" variant="h4" component="h2">
        Worldwide
      </Typography>
      <Grid
        container
        className={classes.grid_container}
        spacing={3}
        justify="center">
        <CardComponent
          className={classes.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={classes.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={classes.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
}

export default Cards;
