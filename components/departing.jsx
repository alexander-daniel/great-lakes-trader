import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const Departing = (props) => {
  const { setCurrentScene, sail, destinations } = props;

  return (
    <div style={{ padding: '10px', width: '200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{'Travel where?'}</h3>
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </div>
      {destinations.map((dest, i) => {
        return (
          <button key={i} onClick={sail.bind(null, dest.id)}>
            {dest.name}
          </button>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  sail: (destID) => dispatch(actions.sail(destID))
});

export default connect(
  (state) => ({ ...state }),
  mapDispatchToProps
)(Departing);


