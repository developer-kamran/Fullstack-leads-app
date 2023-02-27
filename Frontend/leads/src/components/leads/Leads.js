import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getLeads, deleteLead } from '../../reducer/actions/leads';

const Leads = ({ leads, dispatch }) => {
  useEffect(() => {
    getLeads(dispatch);
  }, []);
  return (
    <>
      <h2>Leads</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const { id, name, email, message } = lead;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{message}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => deleteLead(lead.id, dispatch)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  const leads = state.leads.leads;
  return { leads };
};

export default connect(mapStateToProps)(Leads);
