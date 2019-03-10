import React from 'react';
import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const MoneyLender = ({ deposit, withdraw, setCurrentScene, cash }) => {

  let textInput = React.createRef();

  return (
    <div style={{ padding: '10px', width: '320px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'Mo\' the money lender'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>
      {/* <input
        type="number"
        min="1"
        max={cash * 2}
        style={{ marginBottom: '5px', marginRight: '5px', textAlign: 'center' }}
        placeholder="amount"
        ref={textInput}
      />
      <button onClick={() => withdraw(parseInt(textInput.current.value, 10))}>{'Borrow'}</button>
      <button onClick={() => withdraw(parseInt(textInput.current.value, 10))}>{'Repay'}</button> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  deposit: (amount) => dispatch(actions.deposit(amount)),
  withdraw: (amount) => dispatch(actions.withdraw(amount))
});

export default connect(
  (state) => ({ ...state }),
  mapDispatchToProps
  )(MoneyLender);
