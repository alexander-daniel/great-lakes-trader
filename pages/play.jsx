import React from 'react';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';
import Departing from '../components/departing';
import Buying from '../components/buying';
import Selling from '../components/selling';
import Finances from '../components/finances';
import Stocks from '../components/stocks';
import Choices from '../components/choices';

import '../styles/reset.css';
import '../styles/index.css';

class Interface extends React.Component {
  renderInteractive() {
    const {
      currentScene
    } = this.props;

    switch (currentScene) {
      case UI_SCENES.IS_LEAVING:
        return <Departing />;
      case UI_SCENES.IS_BUYING:
        return <Buying />;
      case UI_SCENES.IS_SELLING:
        return <Selling />;
      default:
        return <Choices />;
    }
  }

  render() {
    const {
      destinations,
      currentIsland,
      date
    } = this.props;

    const currentLocation = destinations.filter(d => d.id === currentIsland.islandID)[0].name;

    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div style={{ marginLeft: '10px' }}>
          <h1>{'Great Lakes'}</h1>
          <h2>{`${currentLocation}`}</h2>
          <div>{`${date.day} ${date.month} ${date.year}`}</div>
        </div>

        <Stocks />

        <div style={{ display: 'flex', width: 'fit-content' }}>
          <Finances />
          {this.renderInteractive()}
        </div>

      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(Interface);
