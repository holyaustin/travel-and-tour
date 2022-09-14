/* eslint-disable no-alert */
import React from 'react';
// import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import Header from './Header/Header';
import Feature from './Feature';
import '../index.css';
import Coinbase from './coinbase';
import background2 from '../images/safari1.jpg';
// import background3 from '../images/safari4.jpg';

const theme = {
  blue: {
    default: '#3f51b5',
    hover: '#283593',
  },
  pink: {
    default: '#e91e63',
    hover: '#ad1457',
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: 'blue',
};

function Home() {
  return (
    <div
      className="gradient-bg-welcome"
      style={{
        backgroundImage: `url(${background2})`,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >

      <Header />
      <div className="container">
        <div className="d-flex flex-row my-16">

          <div className="col-lg-6 ">
            <p>
              <a href="/Explore" target="_self" rel="noreferrer">
                <Button id="btn-login" variant="primary" size="lg" style={{ width: '100%', padding: '10px 7px 10px 7px', backgroundColor: 'red', fontSize: '26px' }}> Explore Africa</Button>
              </a>
            </p>

          </div>

          <div className="col-lg-5" style={{ color: 'black', fontWweight: '400' }}>
            <h1 className="font-extrabold font-sans text-4xl font text-blue-900"><b> Hire a Tourist Assistant</b> </h1>
            <br />   <br />
            <h4 align="justify">
              You do not have to be on that vacation without a tourist guide.
              This system maps you to a guide that tours you around. The tourist guide
              helps to answer questions as you tour around the location you are in.
              All you need is your Web3 wallet and you have a tour guide to experience
              the best tour ever.
            </h4>
            <div>
              <Coinbase />
              {/**
              {currentAccount === '' ? (
                <Button type="button" onClick={connectWallet} variant="primary" size="lg" className="font-extrabold " style={{ width: '100%', padding: '25px 7px 25px 7px', fontSize: '36px' }}> Connect Wallet </Button>

              ) : (

                <Card style={{ width: '100%', padding: '20px 7px 20px 7px', fontSize: '30px', color: 'red', textAlign: 'center' }}>
                  {`${currentAccount.substring(0, 8)} ... ${currentAccount.substring(
                    34,
                  )}`}
                </Card>
              )}
              */}
            </div>
          </div>
        </div>

      </div>
      <br />
      <Feature />
    </div>

  );
}

export default Home;
