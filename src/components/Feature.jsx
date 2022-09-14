import React from 'react';
import Image from '../images/s3.jpg';

const Feature = () => (
  <div
    className="max-w-screen-xl mt-8 mb-6 md:mt-24 md:mb-14 px-6 md:px-8 lg:px-16 mx-auto"
    id="feature"
  >
    <div className="grid grid-flow-row md:grid-flow-col grid-cols-1 md:grid-cols-2 gap-8 py-8 my-12">
      <div className="flex w-full justify-end">
        <div className="h-full w-full p-4">
          <img
            src={Image}
            alt="imagee"
            layout="responsive"
            quality={100}
            height={414}
            width={508}
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col items-end justify-center ml-auto w-full lg:w-11/12">
        <h3 className=" text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
          Features You Can Enjoy
        </h3>
        <p className="my-2 text-black-500 text-2xl">
          You can explore the features that we provide with fun and you can suggest features you intend to see.
        </p>
        <ul className="text-xl text-black self-start list-disc list-inside ml-8">
          <li className="relative circle-check custom-list">
            Know a Place before you visit with our Map.
          </li>
          <li className="relative circle-check custom-list">
            Engage a Tour Guide with the power of Web3.
          </li>
          <li className="relative circle-check custom-list">
            Mint Places of Attractions as NFTs
          </li>
          <li className="relative circle-check custom-list">
            Explore Restaurants with Rankings and Awards
          </li>
          <li className="relative circle-check custom-list">
            Experience Best Tour Ever
          </li>
          <li className="relative circle-check custom-list">
            Stream Payment as you are served
          </li>
          <li className="relative circle-check custom-list">
            Wallet for Mobile or desktop
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Feature;
