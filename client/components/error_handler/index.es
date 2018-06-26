import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorJS from '../error_js';


class ErrorHandler extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: null,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) return <ErrorJS />;

    return this.props.children;
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.any,
};

export default ErrorHandler;
