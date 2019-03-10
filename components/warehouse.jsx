import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';
import { getTotalCargoWeight } from '../lib/selectors';

const Warehouse = (props) => {
  const {
    setCurrentScene,
    ship,
    storageLeft,
    warehouse,
    withdrawFromWarehouse,
    storeInWarehouse
  } = props;

  return (
    <div style={{ padding: '10px', width: '320px' }}>

      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
          {'Store'}
          <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
        </h3>

        {Object.keys(ship.storage.contents).map((goodType, i) => {

          let max = ship.storage.contents[goodType];

          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`${goodType}`}</div>
              <div>
                {
                  max >= 1 ?
                  <button onClick={storeInWarehouse.bind(null, goodType, 1)}>{1}</button>
                  : null
                }

                {
                  max >= 5 ?
                  <button onClick={storeInWarehouse.bind(null, goodType, 5)}>{5}</button>
                  : null
                }
                <button
                  onClick={storeInWarehouse.bind(null, goodType, max)}
                  style={{ minWidth: '90px' }}
                >
                  {`Max (${max})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
          {'Withdraw'}
        </h3>

        {Object.keys(ship.storage.contents).map((goodType, i) => {

          let maxWithdraw;

          if (warehouse.contents[goodType] > storageLeft) {
            maxWithdraw = storageLeft;
          } else {
            maxWithdraw = warehouse.contents[goodType];
          }

          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`${goodType}`}</div>
              <div>
                {
                  storageLeft >= 1 && warehouse.contents[goodType] >= 1 ?
                  <button onClick={withdrawFromWarehouse.bind(null, goodType, 1)}>{1}</button>
                  : null
                }

                {
                  storageLeft >= 5 && warehouse.contents[goodType] >= 5 ?
                  <button onClick={withdrawFromWarehouse.bind(null, goodType, 5)}>{5}</button>
                  : null
                }
                <button
                  onClick={withdrawFromWarehouse.bind(null, goodType, maxWithdraw)}
                  style={{ minWidth: '90px' }}
                >
                  {`Max (${maxWithdraw})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  storeInWarehouse: (goodType, quantity) => dispatch(actions.storeInWarehouse(goodType, quantity)),
  withdrawFromWarehouse: (goodType, quantity) => dispatch(actions.withdrawFromWarehouse(goodType, quantity))
});

export default connect(
  (state) => ({
    ...state,
    storageLeft: state.ship.storage.max - getTotalCargoWeight(state)
  }),
  mapDispatchToProps
)(Warehouse);
