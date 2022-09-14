import React from 'react';
import Header from './Header/Header';
import '../Superfluidstyles.css';
import { CalculateFlowRate } from './CalculateFlowRate';
import { CreateFlow } from './CreateFlow';

export default function Hire() {
  return (
    <div className="App">
      <Header />
      <CalculateFlowRate />
      <CreateFlow />
    </div>
  );
}
