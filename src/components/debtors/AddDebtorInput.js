import React from 'react';

const AddDebtorInput = props => {
  return (
    <input
      type="text"
      className="form-control"
      name={props.name}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export { AddDebtorInput };
