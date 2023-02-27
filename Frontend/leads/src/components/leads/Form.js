import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addLead } from '../../reducer/actions/leads';

const Form = ({ addLead }) => {
  const [data, setData] = useState({
    id: null,
    name: '',
    email: '',
    message: '',
  });
  const onSubmit = (e) => {
    e.preventDefault();
    addLead(data);
    setData({ id: null, name: '', email: '', message: '' });
  };
  return (
    <div className='card card-body mt-4 mb-4'>
      <h2>Add Lead</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group mt-3'>
          <label htmlFor='name'>Name:</label>
          <input
            required
            type='text'
            className='form-control '
            name='name'
            id='name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className='form-group my-3'>
          <label htmlFor='email'>Email:</label>
          <input
            required
            type='email'
            className='form-control'
            name='email'
            id='email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className='form-group my-3'>
          <label htmlFor='message'>Message:</label>
          <textarea
            required
            type='text'
            className='form-control'
            name='message'
            id='message'
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
        </div>
        <div className='form-group mt-3'>
          <button type='submit ' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addLead })(Form);
