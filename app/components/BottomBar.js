// @flow
//
// Copyright (C) 2019 ExtraHash
//
// Please see the included LICENSE file for more information.
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { session, loginCounter } from '../index';
import SyncStatus from './SyncStatus';
import Balance from './Balance';
import NodeFee from './NodeFee';

type Location = {
  hash: string,
  pathname: string,
  search: string
};

type Props = {
  location: Location,
  darkMode: boolean
};

type State = {
  navBarCount: number
};

class BottomBar extends Component<Props, State> {
  props: Props;

  state: State;

  constructor(props?: Props) {
    super(props);
    this.state = {
      navBarCount: loginCounter.navBarCount
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // prettier-ignore
    const { darkMode } = this.props;
    const { navBarCount } = this.state;

    return (
      <div
        className={
          // eslint-disable-next-line no-nested-ternary
          darkMode
            ? navBarCount > 0
              ? 'footerbar has-background-black'
              : 'footerbar-slideup has-background-black'
            : navBarCount > 0
            ? 'footerbar has-background-light'
            : 'footerbar-slideup has-background-light'
        }
      >
        {session.wallet && (
          <div className="field is-grouped is-grouped-multiline is-grouped-right">
            <NodeFee size="is-large" darkMode={darkMode} />
            <SyncStatus size="is-large" darkMode={darkMode} />
            <Balance size="is-large" darkMode={darkMode} />
          </div>
        )}
      </div>
    );
  }
}

// $FlowFixMe
export default withRouter(BottomBar);
