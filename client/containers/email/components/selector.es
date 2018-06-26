import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindTo } from 'nebenan-helpers/lib/utils';


class Selector extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this, 'renderItem');
  }

  renderItem(item) {
    const { onSelect } = this.props;
    const { displayName } = item;

    return (
      <div key={displayName} onClick={onSelect.bind(null, displayName)}>
        {displayName}
      </div>
    );
  }

  render() {
    const { items } = this.props;
    return <aside>{items.map(this.renderItem)}</aside>;
  }
}

Selector.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Selector;
