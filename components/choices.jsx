import { connect } from 'react-redux';
import * as actions from '../lib/actions';
import { UI_SCENES } from '../lib/types';

const Choices = ({ setCurrentScene }) => {
  return (
    <div style={{ padding: '10px' }}>
      <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_BUYING)}>{'Buy'}</button>
      <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_SELLING)}>{'Sell'}</button>
      <button onClick={setCurrentScene.bind(null, UI_SCENES.IS_LEAVING)}>{'Leave'}</button>

      {/* TODO: check if desintation has a bank or a money lender */}
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
