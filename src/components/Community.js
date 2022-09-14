import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header';

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

const Community = () => (
  <div align="center">
    <Header />
    <h1>Join our Community Page</h1>
    <br />

    <div align="center" style={{ width: '100%', align: 'center' }}>
      <div className="d-flex flex-row">
        <div>
          <p>
            <a href="/Explore" target="_self" rel="noreferrer">
              <Button id="btn-login" variant="primary" size="lg" style={{ width: '100%', padding: '7px 7px 7px 7px', fontSize: '36px' }}>
                Join us on Discord
              </Button>
            </a>
          </p>

          <p>
            <a href="/Explore" target="_self" rel="noreferrer">
              <Button id="btn-login" variant="primary" size="lg" style={{ width: '100%', padding: '7px 7px 7px 7px', fontSize: '36px' }}>
                Follow us on Twitter
              </Button>
            </a>
          </p>
          <p>
            <a href="/Explore" target="_self" rel="noreferrer">
              <Button id="btn-login" variant="primary" size="lg" style={{ width: '100%', padding: '7px 7px 7px 7px', margin: '1px 1px 15px 1px', fontSize: '36px' }}>
                Join us on Telgram
              </Button>
            </a>
          </p>
          <p>
            <a href="/Explore" target="_self" rel="noreferrer">
              <Button id="btn-login" variant="primary" size="lg" style={{ width: '100%', padding: '7px 7px 7px 7px', fontSize: '36px' }}>
                Follow us in Medium
              </Button>
            </a>
          </p>

          <p>
            <a href="/Explore" target="_self" rel="noreferrer">
              <Button id="btn-login" variant="primary" size="lg" style={{ width: '100%', padding: '7px 7px 7px 7px', fontSize: '36px' }}>
                Subscribe to our Youtube
              </Button>
            </a>
          </p>
          <br />
        </div>
      </div>

    </div>
  </div>
);

export default Community;
