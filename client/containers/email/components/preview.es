import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindTo } from 'nebenan-helpers/lib/utils';
import { arrayToObject } from 'nebenan-helpers/lib/data';

import Layout from '../../../email/layout';


class Preview extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this, 'renderItem');
  }

  renderItem(item, index) {
    const { displayName, data } = item;
    const Component = this.items[displayName];
    const key = `${displayName}:${index}`;

    return <Component key={key} data={data} />;
  }

  render() {
    const { items, meta } = this.props;
    this.items = arrayToObject(items, 'displayName');
    return <Layout>{meta.map(this.renderItem)}</Layout>;
  }
}

Preview.propTypes = {
  meta: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

export default Preview;
