import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const LoanCalculator = props => {
  return (
    <div>
      <h1>Loan Calculator</h1>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card card-body text-center mt-1">
            <form>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Loan Amount"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">%</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Interest Rate"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Years to Repay"
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Calculate"
                  className="btn btn-dark btn-block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoanCalculator.propTypes = {};

export default LoanCalculator;
