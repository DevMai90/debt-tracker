import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Spinner } from '../layout/Spinner';

class EditDebtor extends Component {
  // Using refs because our input is not coming from state.
  // Create a ref and attach it to an HTML element.
  // Allows us to access React elements created in the render.
  constructor(props) {
    super(props);

    this.debtorNameInput = React.createRef();
    this.loanTypeInput = React.createRef();
    this.monthlyPmtInput = React.createRef();
    this.balanceInput = React.createRef();
    this.collateralInput = React.createRef();
    this.maturityDateInput = React.createRef();
    this.originalPrincipalInput = React.createRef();
    this.loanNumberInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { firestore, debtor, history } = this.props;

    const updatedDebtor = {
      debtorName: this.debtorNameInput.current.value,
      loanType: this.loanTypeInput.current.value,
      monthlyPmt: this.monthlyPmtInput.current.value,
      balance: this.balanceInput.current.value,
      collateral: this.collateralInput.current.value,
      maturityDate: this.maturityDateInput.current.value,
      originalPrincipal: this.originalPrincipalInput.current.value,
      loanNumber: this.loanNumberInput.current.value
    };

    firestore
      .update({ collection: 'debtors', doc: debtor.id }, updatedDebtor)
      .then(history.push(`/debtor/${debtor.id}`));
  };

  render() {
    const { debtor } = this.props;

    if (debtor) {
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
              <h4>Edit Debtor Information</h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
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
                    ref={this.debtorNameInput}
                    defaultValue={debtor.debtorName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="loanType">Loan Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="loanType"
                    ref={this.loanTypeInput}
                    defaultValue={debtor.loanType}
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
                    ref={this.monthlyPmtInput}
                    defaultValue={debtor.monthlyPmt}
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
                    ref={this.balanceInput}
                    defaultValue={debtor.balance}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="collateral">Collateral</label>
                  <input
                    type="text"
                    className="form-control"
                    name="collateral"
                    ref={this.collateralInput}
                    defaultValue={debtor.collateral}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="maturityDate">Maturity Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maturityDate"
                    ref={this.maturityDateInput}
                    defaultValue={debtor.maturityDate}
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
                    ref={this.originalPrincipalInput}
                    defaultValue={debtor.originalPrincipal}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="loanNumber">Loan Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="loanNumber"
                    ref={this.loanNumberInput}
                    defaultValue={debtor.loanNumber}
                  />
                </div>
                <small>
                  <span className="text-danger">*</span> indicates required
                  fields
                </small>
                <input type="submit" className="btn btn-secondary btn-block" />
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditDebtor.propTypes = {
  firestore: PropTypes.object
};

export default compose(
  firestoreConnect(props => [
    { collection: 'debtors', storeAs: 'debtor', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    debtor: ordered.debtor && ordered.debtor[0]
  }))
)(EditDebtor);
