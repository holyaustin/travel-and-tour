/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import useStyles from './styles2.js';

const myStyles = makeStyles({
  header: {
    backgroundColor: 'gold',
    color: 'black',
    boxShadow: '0px 0px 0px 0px',
  },
});

function Header2() {
  const [country, setCountry] = useState('');
  const [cases, setCases] = useState('');
  const [recovered, setRecovered] = useState('');
  const [deaths, setDeaths] = useState('');
  const [todayCases, setTodayCases] = useState('');
  // const [deathCases, setDeathCases] = useState('');
  // const [recoveredCases, setRecoveredCases] = useState('');
  // const [userInput, setUserInput] = useState('');

  const setData = ({
    country,
    cases,
    deaths,
    recovered,
    todayCases,
    // todayDeaths,
    // todayRecovered,
  }) => {
    setCountry(country);
    setCases(cases);
    setRecovered(recovered);
    setDeaths(deaths);
    setTodayCases(todayCases);
    // setDeathCases(todayDeaths);
    // setRecoveredCases(todayRecovered);
  };

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries/nigeria')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // const Header2 = () => {
  const classes = useStyles();
  const classes2 = myStyles();

  return (
    <AppBar position="static" className={classes2.header}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Current Covid 19 Stats for:
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Country : {country}
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Total Confirmed Cases : {cases}
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Cases Today : {todayCases}
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Total Recovered : {recovered}
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Total Deaths : {deaths}
        </Typography>
      </Toolbar>
    </AppBar>
  );
  // };
}

export default Header2;
