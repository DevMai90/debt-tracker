import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Debtors extends Component {
  render() {
    const debtors = [
      {
        id: '1',
        balance: '100',
        collateral: 'UCC-1',
        debtorName: 'Chase',
        interestRate: '5%',
        loanType: 'CRE',
        maturityDate: '02/02/20',
        monthlyPmt: '100'
      },
      {
        id: '2',
        balance: '100',
        collateral: 'UCC-1',
        debtorName: 'Chase',
        interestRate: '5%',
        loanType: 'CRE',
        maturityDate: '02/02/20',
        monthlyPmt: '100'
      },
      {
        id: '3',
        balance: '1000',
        collateral: 'UCC-1',
        debtorName: 'Chase',
        interestRate: '5%',
        loanType: 'CRE',
        maturityDate: '02/02/20',
        monthlyPmt: '100'
      }
    ];

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

export default Debtors;
