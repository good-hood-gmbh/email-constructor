import React from 'react';
import withPolyglot from 'react-node-polyglot/lib/with_polyglot';


const ErrorJS = (props) => {
  const { t } = props;

  return (
    <article>
      <h1>{t('error_js.title')}</h1>
      {t('error_js.text')}
    </article>
  );
};

export default withPolyglot(ErrorJS);
