import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Spinner } from '../layout/Spinner';
import classnames from 'classnames';

class DebtDetails extends Component {
  state = {
    showBalanceUpdate: false,
    showMonthlyPmtUpdate: false,
    balanceUpdateAmount: '',
    monthlyPmtUpdateAmount: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onDeleteClick = () => {
    const { firestore, debtor, history } = this.props;

    firestore
      .delete({ collection: 'debtors', doc: debtor.id })
      .then(history.push('/'));
  };

  balanceSubmit = e => {
    e.preventDefault();

    const { firestore, debtor } = this.props;
    const { balanceUpdateAmount } = this.state;

    // Create object with info to be updated
    const updatedBalance = {
      balance: balanceUpdateAmount
    };

    // firestore has .update() because of firestoreConnect()
    // 1st arg -> collection and document that we're working with. (object)
    // 2nd arg -> what we're updating
    firestore.update({ collection: 'debtors', doc: debtor.id }, updatedBalance);
  };

  monthlyPmtSubmit = e => {
    e.preventDefault();

    const { firestore, debtor } = this.props;
    const { monthlyPmtUpdateAmount } = this.state;

    const updatedPmtAmount = {
      monthlyPmt: monthlyPmtUpdateAmount
    };

    firestore.update(
      { collection: 'debtors', doc: debtor.id },
      updatedPmtAmount
    );
  };

  render() {
    const { debtor } = this.props;
    const {
      showBalanceUpdate,
      showMonthlyPmtUpdate,
      balanceUpdateAmount,
      monthlyPmtUpdateAmount
    } = this.state;

    // Update Monthly Payment
    let monthlyPmtForm;

    if (showMonthlyPmtUpdate) {
      monthlyPmtForm = (
        <form onSubmit={this.monthlyPmtSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="monthlyPmtUpdateAmount"
              placeholder="New Monthly Payment"
              onChange={this.onChange}
              value={monthlyPmtUpdateAmount}
            />
            <div className="input-group-append">
              <input type="submit" className="btn btn-outline-dark" />
            </div>
          </div>
        </form>
      );
    } else {
      monthlyPmtForm = null;
    }

    // Update Outstanding Balance
    let balanceForm;

    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="New Outstanding Balance"
              onChange={this.onChange}
              value={balanceUpdateAmount}
            />
            <div className="input-group-append">
              <input type="submit" className="btn btn-outline-dark" />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (debtor) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>

            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/debtor/edit/${debtor.id}`} className="btn btn-dark">
                  <i className="far fa-edit" /> Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  <i className="far fa-trash-alt" /> Delete
                </button>
              </div>
            </div>
          </div>

          <hr />

          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h4>{debtor.debtorName}</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-start row-hl">
                <div className="item-hl">
                  <h5>
                    Debtor ID:{' '}
                    <span className="text-secondary">{debtor.id}</span>
                  </h5>
                </div>
              </div>

              <div className="d-flex justify-content-between row-hl">
                <div className="item-hl">
                  <h5>
                    Monthly Payment:{' '}
                    <span
                      className={classnames({
                        'text-danger': debtor.monthlyPmt > 0,
                        'text-success': debtor.monthlyPmt == 0
                      })}
                    >
                      ${parseFloat(debtor.monthlyPmt).toFixed(2)}
                    </span>{' '}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showMonthlyPmtUpdate: !this.state
                              .showMonthlyPmtUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h5>
                  {monthlyPmtForm}
                </div>

                <div className="item-hl">
                  <h5>
                    Outstanding Balance:{' '}
                    <span
                      className={classnames({
                        'text-danger': debtor.balance > 0,
                        'text-success': debtor.balance == 0
                      })}
                    >
                      ${parseFloat(debtor.balance).toFixed(2)}
                    </span>{' '}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h5>
                  {balanceForm}
                </div>
              </div>

              <hr />

              <ul className="list-group">
                <li className="list-group-item">
                  Debtor Name: {debtor.debtorName}
                </li>
                <li className="list-group-item">
                  Loan Type: {debtor.loanType}
                </li>
                <li className="list-group-item">
                  Monthly Payment: {debtor.monthlyPmt}
                </li>
                <li className="list-group-item">
                  Outstanding Balance: {debtor.balance}
                </li>
                <li className="list-group-item">
                  Collateral: {debtor.collateral}
                </li>
                <li className="list-group-item">
                  Maturity Date: {debtor.maturityDate}
                </li>
                <li className="list-group-item">
                  Original Loan Amount: {debtor.originalPrincipal}
                </li>
                <li className="list-group-item">
                  Loan Number: {debtor.loanNumber}
                </li>
              </ul>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

DebtDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  // We need to get the id from the URL. Use storeAs or else we have conflicting names. Specify document we want to grab. We are identifying it by ID.
  firestoreConnect(props => [
    { collection: 'debtors', storeAs: 'debtor', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    debtor: ordered.debtor && ordered.debtor[0]
  }))
)(DebtDetails);
