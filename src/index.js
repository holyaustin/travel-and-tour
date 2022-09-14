import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';
import Home from './components/Home';
import Explore from './components/Explore';
import Hire from './components/Hire';
import Become from './components/Become';
import Community from './components/Community';
import View from './components/View';
import Memory from './components/memory';

const NftDetails = ({ data }) => (
  <div className="nft-cont">
    <div className="img-container">
      <img
        onError={(event) => {
          event.target.classList.add('error-image');
          event.target.classList.remove('nft-img');
        }}
        className="nft-img"
        src={data?.external_data?.image}
      />
    </div>
    <div className="nft-details">
      <h1>{data?.external_data?.name}</h1>
      <h2>Token ID : {data?.token_id}</h2>
      <p>{data?.external_data?.description}</p>
      <table className="nft-table">
        {data?.external_data?.attributes
          ? (
            <>
              {data.external_data.attributes.map((o, i) => (
                <tr key={i}>
                  <td> {o.trait_type} </td>
                  <td> {o.value} </td>
                </tr>
              ))}
            </>
          )
          : null}
      </table>
    </div>
  </div>
);

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="View" element={<View />} />
      <Route path="Hire" element={<Hire />} />
      <Route path="Become" element={<Become />} />
      <Route path="Community" element={<Community />} />
      <Route path="Explore" element={<Explore />} />
      <Route path="Memory" element={<Memory />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById('root'),
);
export default NftDetails;
