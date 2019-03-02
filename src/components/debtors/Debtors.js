import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Debtors extends Component {
  render() {
    const { debtors } = this.props;

    if (debtors) {
      return (
        <div>
          <div className="row mt-2">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-university" /> Debtors
              </h2>
            </div>

            <div className="col-md-">
              <h2>Subtotal Placeholder</h2>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Debtor Name</th>
                <th>Loan Type</th>
                <th>Monthly Payment</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {debtors.map(debtor => {
                return (
                  <tr key={debtor.id}>
                    <td>{debtor.debtorName}</td>
                    <td>{debtor.loanType}</td>
                    <td>${parseFloat(debtor.monthlyPmt).toFixed(2)}</td>
                    <td>${parseFloat(debtor.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/debtor/${debtor.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fas fa-arrow-circle-right" /> Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

Debtors.propTypes = {
  firestore: PropTypes.object.isRequired,
  debtors: PropTypes.object.isRequired
};

export default compose(
  // Pass in the collection that we want to access from firestore.
  firestoreConnect([{ collection: 'debtors' }]), // Gets 'debtors' from firestore.
  // Our state has firestore => ordered => debts which is what we're trying to access. All this will be put into a property called debtors. Will be accessible through this.props.debtors.
  connect((state, props) => ({
    debtors: state.firestore.ordered.debtors
  }))
)(Debtors);
