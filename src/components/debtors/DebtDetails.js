import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Spinner } from '../layout/Spinner';
import classnames from 'classnames';

class DebtDetails extends Component {
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

            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/debtor/edit/${debtor.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>

          <hr />

          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h4>{debtor.debtorName}</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h5>
                    Debtor ID:{' '}
                    <span className="text-secondary">{debtor.id}</span>
                  </h5>
                </div>

                <div className="col-md-4 col-sm-6">
                  <h5 className="float-right">
                    Balance:{' '}
                    <span
                      className={classnames({
                        'text-danger': debtor.balance > 0,
                        'text-success': debtor.balance == 0
                      })}
                    >
                      ${parseFloat(debtor.balance).toFixed(2)}
                    </span>
                  </h5>
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
