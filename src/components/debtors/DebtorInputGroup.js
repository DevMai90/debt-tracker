import React from 'react';

const DebtorInputGroup = props => {
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

export { DebtorInputGroup };
