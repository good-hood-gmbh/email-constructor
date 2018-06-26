import React, { PureComponent } from 'react';
import { bindTo } from 'nebenan-helpers/lib/utils';

import items from './items';

import Layout from '../../components/layout';
import Selector from './components/selector';


class Email extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { meta: [] };
    bindTo(this, 'handleSelect');
  }

  handleSelect(displayName) {
    const meta = [...this.state.meta];

    meta.push({
      displayName,
      data: {},
    });

    this.setState({ meta });
  }

  render() {
    console.warn(this.state);
    return (
      <Layout>
        <Selector items={items} onSelect={this.handleSelect} />
      </Layout>
    );
  }
}

export default Email;
