import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPolyglot from 'react-node-polyglot/lib/with_polyglot';


const Layout = (props) => {
  const { t, children, ...cleanProps } = props;
  const className = classNames('c-layout', props.className);

  return (
    <div {...cleanProps} className={className}>
      {children}
    </div>
  );
};

Layout.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withPolyglot(Layout);
