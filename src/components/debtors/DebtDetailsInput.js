import React from 'react';

export const DebtDetailsInput = props => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
      <div className="input-group-append">
        <input type="submit" className="btn btn-outline-dark" />
      </div>
    </div>
  );
};
