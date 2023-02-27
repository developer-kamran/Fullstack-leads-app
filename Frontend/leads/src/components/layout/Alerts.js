import React, { useEffect } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

const Alerts = ({ alert, error, message }) => {
  useEffect(() => {
    if (error.msg.name) {
      alert.error(`Name: ${error.msg.name.join()}`);
    }
    if (error.msg.email) {
      alert.error(`Email: ${error.msg.email.join()}`);
    }
    if (error.msg.message) {
      alert.error(`Message: ${error.msg.message.join()}`);
    }
    if (error.msg.non_field_errors) {
      alert.error(`${error.msg.non_field_errors.join()}`);
    }
    if (error.msg.username) {
      alert.error(` ${error.msg.username.join()}`);
    }
    if (message.leadDeleted) alert.success(message.leadDeleted);
    if (message.leadAdded) alert.success(message.leadAdded);
    if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
  }, [error, message]);
  return <></>;
};

const mapStateToProps = (state) => {
  const error = state.errors;
  const message = state.messages;

  return { error, message };
};

export default connect(mapStateToProps)(withAlert()(Alerts));
