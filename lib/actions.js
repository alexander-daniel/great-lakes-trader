import { UI_SCENES } from './types';

export const LOG = 'LOG';
export const SAIL = 'SAIL';
export const ARRIVE = 'ARRIVE';
export const BUY = 'BUY';
export const SELL = 'SELL';
export const SET_DATE = 'SET_DATE';


export const SET_CURRENT_SCENE = 'SET_CURRENT_SCENE';
export const setCurrentScene = (sceneType) => {
  return {
    type: SET_CURRENT_SCENE,
    sceneType
  };
};

export const arrive = (islandID) => (dispatch, getState) => {

  // Update prices at new island market.
  // Loan should accrue interest
  // Bank should genereate interest
  // date shoudl advance.

  dispatch({
    type: LOG,
    message: `Arrived in ${islandID}`
  });

  const oldDate = getState().date;
  dispatch({
    type: SET_DATE,
    date: {
      ...oldDate,
      day: oldDate.day + 1
    }
  });

  dispatch({
    type: ARRIVE,
    islandID
  });

  dispatch(setCurrentScene(UI_SCENES.NULL));
};

export const sail = (islandID) => (dispatch) => {

  dispatch({
    type: LOG,
    message: `Departed for Island ${islandID}`
  });

  // Do any stuff before arrival
  //
  // Pirates
  // Storm
  // etc

  dispatch(arrive(islandID));
};


export const buy = (goodType, quantity) => (dispatch, getState) => {
  const price = getState().currentIsland.market[goodType];
  const totalPrice = price * quantity;

  // TODO: Make sure ship can hold new quantity!
  dispatch({
    type: BUY,
    goodType,
    quantity,
    totalPrice
  });
};


export const sell = (goodType, quantity) => (dispatch, getState) => {
  const price = getState().currentIsland.market[goodType];
  const totalPrice = price * quantity;

  // TODO: Make sure not to decrement past 0 quantity!
  dispatch({
    type: SELL,
    goodType,
    quantity,
    totalPrice
  });
};
