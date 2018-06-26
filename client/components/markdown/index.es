import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';


const options = {
  gfm: false,
  tables: false,
  breaks: true,
  sanitize: true,
};

const Markdown = (props) => {
  const { text, ...cleanProps } = props;
  const safeContent = { __html: marked(text, options) };

  return <div {...cleanProps} dangerouslySetInnerHTML={safeContent} />;
};

Markdown.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Markdown;
