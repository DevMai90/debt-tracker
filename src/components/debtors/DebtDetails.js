import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Spinner } from '../layout/Spinner';

class DebtDetails extends Component {
  render() {
    const { debtor } = this.props;
    if (debtor) {
      return (
        <div>
          <h1>{debtor.debtorName}</h1>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  // We need to get the id from the URL. Use storeAs or else we have conflicting names. Specify document we want to grab. We are identifying it by ID.
  firestoreConnect(props => [
    { collection: 'debtors', storeAs: 'debtor', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    debtor: ordered.debtor && ordered.debtor[0]
  }))
)(DebtDetails);
