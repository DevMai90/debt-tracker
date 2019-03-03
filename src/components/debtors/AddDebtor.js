import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddDebtor extends Component {
  state = {
    debtorName: '',
    loanType: '',
    monthlyPmt: '',
    balance: '',
    collateral: '',
    maturityDate: '',
    originalPrincipal: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-header bg-secondary text-white">
            Add New Debt Information
          </div>
          <div className="card-body">
            <div className="form">
              <div className="form-group">
                <label htmlFor="debtorName">
                  Debtor Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="debtorName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.debtorName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="loanType">Loan Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="loanType"
                  onChange={this.onChange}
                  value={this.state.loanType}
                />
              </div>

              <div className="form-group">
                <label htmlFor="monthlyPmt">
                  Monthly Payment<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="monthlyPmt"
                  required
                  onChange={this.onChange}
                  value={this.state.monthlyPmt}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">
                  Current Balance<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  required
                  onChange={this.onChange}
                  value={this.state.balance}
                />
              </div>

              <div className="form-group">
                <label htmlFor="collateral">Collateral</label>
                <input
                  type="text"
                  className="form-control"
                  name="collateral"
                  onChange={this.onChange}
                  value={this.state.collateral}
                />
              </div>

              <div className="form-group">
                <label htmlFor="maturityDate">Maturity Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="maturityDate"
                  onChange={this.onChange}
                  value={this.state.maturityDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="originalPrincipal">
                  Original Principal Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="originalPrincipal"
                  required
                  onChange={this.onChange}
                  value={this.state.originalPrincipal}
                />
              </div>
              <small>
                <span className="text-danger">*</span> indicates required fields
              </small>
              <input type="submit" className="btn btn-secondary btn-block" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddDebtor;
