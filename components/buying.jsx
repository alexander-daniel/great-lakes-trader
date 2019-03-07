import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const Buying = (props) => {
  const { buy, setCurrentScene, currentIsland, cash } = props;

  return (
    <div style={{ padding: '10px', width: '200px' }}>

      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'Buy what item?'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>

      {Object.keys(currentIsland.market).map((goodType, i) => {
        const max = Math.floor(cash / currentIsland.market[goodType]);
        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{`${goodType}`}</div>
            <div>
              {
                max >= 1 ?
                <button onClick={buy.bind(null, goodType, 1)}>{1}</button>
                : null
              }

              {
                max >= 5 ?
                <button onClick={buy.bind(null, goodType, 5)}>{5}</button>
                : null
              }
              <button onClick={buy.bind(null, goodType, max)}>{`Max (${max})`}</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  buy: (goodType, quantity) => dispatch(actions.buy(goodType, quantity))
});

export default connect(
  (state) => ({ ...state }),
  mapDispatchToProps
)(Buying);
