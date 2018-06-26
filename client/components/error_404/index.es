import React from 'react';
import withPolyglot from 'react-node-polyglot/lib/with_polyglot';

import Link from '../link';


const Error404 = (props) => {
  const { t } = props;

  return (
    <article>
      <h1>{t('error_404.title')}</h1>
      <Link to="/">{t('error_404.link_home')}</Link>
    </article>
  );
};

export default withPolyglot(Error404);
