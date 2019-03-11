import Link from 'next/link';
import { connect } from 'react-redux';
import * as actions from '../lib/actions';
import { UI_SCENES } from '../lib/types';

const Choices = ({ setCurrentScene, currentIsland, destinations, loan }) => {
  const { hasBank, hasWarehouse, hasMoneyLender } = destinations.filter(d => d.id === currentIsland.islandID)[0];
  return (
    <div style={{ width: '320px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
      <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_BUYING)}>{'Buy'}</button>
      <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_SELLING)}>{'Sell'}</button>
      {
        hasBank ?
        <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_BANKING)}>{'Visit Bank'}</button>
        : null
      }
      {
        hasMoneyLender ?
        <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_BORROWING)}>{'Visit the Money Lender'}</button>
        : null
      }
      {
        hasWarehouse ?
        <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_STORING)}>{'Visit Warehouse'}</button>
        : null
      }
      <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_LEAVING)}>{'Leave'}</button>
      {
        loan <= 0 ?
        <Link href="/retire"><button>{'Retire'}</button></Link>
        : null
      }
      {/* TODO: check if desintation has a money lender */}
    </div>
  );
};

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Choices);
