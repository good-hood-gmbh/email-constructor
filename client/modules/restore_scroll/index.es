import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { scroll } from 'nebenan-helpers/lib/dom';


class RestoreScroll extends Component {
  componentDidMount() {
    this.scroll = scroll(global);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) this.scroll.to();
  }

  componentWillUnmount() {
    delete this.scroll;
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(RestoreScroll);
