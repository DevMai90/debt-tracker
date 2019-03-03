import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Spinner } from '../layout/Spinner';

class Debtors extends Component {
  state = {
    totalOutstanding: null,
    totalMonthly: null
  };

  static getDerivedStateFromProps(props, state) {
    const { debtors } = props;

    // if (debtors) {
    //   let total = debtors.reduce(
    //     (total, debtor) => total + parseFloat(debtor.balance.toString()),
    //     0
    //   );

    //   return { totalOutstanding: total };
    // }
    if (debtors) {
      let totalBalance = debtors.reduce(
        (totalBalance, debtor) =>
          totalBalance + parseFloat(debtor.balance.toString()),
        0
      );

      let totalMonthlyPmt = debtors.reduce(
        (totalMonthlyPmt, monthly) =>
          totalMonthlyPmt + parseFloat(monthly.monthlyPmt.toString()),
        0
      );

      return { totalOutstanding: totalBalance, totalMonthly: totalMonthlyPmt };
    }
    return null;
  }

  render() {
    const { debtors } = this.props;
    const { totalOutstanding, totalMonthly } = this.state;

    if (debtors) {
      return (
        <div>
          <div className="row mb-1">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-university" /> Debtors
              </h2>
            </div>

            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Outstanding: ${parseFloat(totalOutstanding).toFixed(2)}
              </h5>
              <h5 className="text-right text-secondary">
                Monthly Payments: ${parseFloat(totalMonthly).toFixed(2)}
              </h5>
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
              <tr>
                <td />
                <td>
                  <strong>Totals:</strong>
                </td>
                <td>
                  <strong>${parseFloat(totalMonthly).toFixed(2)}</strong>
                </td>
                <td>
                  <strong>${parseFloat(totalOutstanding).toFixed(2)}</strong>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Debtors.propTypes = {
  firestore: PropTypes.object.isRequired,
  debtors: PropTypes.array
};

export default compose(
  // Pass in the collection that we want to access from firestore.
  firestoreConnect([{ collection: 'debtors' }]), // Gets 'debtors' from firestore.
  // Our state has firestore => ordered => debts which is what we're trying to access. All this will be put into a property called debtors. Will be accessible through this.props.debtors.
  connect((state, props) => ({
    debtors: state.firestore.ordered.debtors
  }))
)(Debtors);
