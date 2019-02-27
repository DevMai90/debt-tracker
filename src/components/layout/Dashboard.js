import React from 'react';
import Debtors from '../debtors/Debtors';
import SideBar from './Sidebar';

export default () => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Debtors />
      </div>
      <div className="col-md-2">
        <SideBar />
      </div>
    </div>
  );
};
