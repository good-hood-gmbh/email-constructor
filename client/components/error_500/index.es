import React from 'react';
import withPolyglot from 'react-node-polyglot/lib/with_polyglot';

import Link from '../link';


const Error500 = (props) => {
  const { t } = props;

  return (
    <article>
      <h1>{t('error_500.title')}</h1>
      <Link to="/">{t('error_500.link_home')}</Link>
    </article>
  );
};

export default withPolyglot(Error500);
