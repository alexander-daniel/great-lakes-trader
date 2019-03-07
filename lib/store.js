import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { UI_SCENES } from './types';

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getMarketPrices = () => ({
  general: randomIntFromInterval(2, 18),
  pelts: randomIntFromInterval(50, 250),
  armaments: randomIntFromInterval(350, 1000),
  opium: randomIntFromInterval(1000, 70000)
});

const newGameState = {
  logs: [],
  currentScene: UI_SCENES.INTRO,
  date: {
    day: 1,
    month: 'Jan',
    year: 1850
  },
  cash: 500,
  loan: 1000,
  bank: 10,

  currentIsland: {
    islandID: 0,
    market: getMarketPrices()
  },
  destinations: [
    {
      id: 0,
      name: 'Quebec City',
      hasBank: true,
      hasWarehouse: true,
    },
    {
      id: 1,
      name: 'Montreal',
      hasBank: false,
      hasWarehouse: false,
    },
    {
      id: 2,
      name: 'York',
      hasBank: false,
      hasWarehouse: false,
    },
    {
      id: 3,
      name: 'Detroit',
      hasBank: false,
      hasWarehouse: false,
    },
    {
      id: 4,
      name: 'Kingston',
      hasBank: false,
      hasWarehouse: false,
    },
    {
      id: 4,
      name: 'Rochester',
      hasBank: false,
      hasWarehouse: false,
    }
  ],
  ship: {
    level: 0,
    cannons: {
      max: 2,
      current: 0
    },
    storage: {
      max: 100,
      contents: {
        general: 0,
        pelts: 0,
        armaments: 0,
        opium: 0,
      }
    }
  },
  warehouse: {
    max: 0,
    contents: {
      general: 0,
      pelts: 0,
      armaments: 0,
      opium: 0,
    }
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {

    case actions.SET_DATE:
      return {
        ...state,
        date: {
          ...action.date
        }
      };

    case actions.SET_CURRENT_SCENE:
      return {
        ...state,
        currentScene: action.sceneType
      };

    case actions.ARRIVE:
      return {
        ...state,
        bank: state.bank + (state.bank * 0.01),
        loan: state.loan + (state.loan * 0.015),
        currentIsland: {
          islandID: action.islandID,
          market: getMarketPrices(),
        }
      };

    case actions.BUY:
      return {
        ...state,
        cash: state.cash - action.totalPrice,
        ship: {
          ...state.ship,
          storage: {
            ...state.ship.storage,
            contents: {
              ...state.ship.storage.contents,
              [action.goodType]: state.ship.storage.contents[action.goodType] + action.quantity
            }
          }
        }
      };

    case actions.SELL:
    return {
      ...state,
      cash: state.cash + action.totalPrice,
      ship: {
        ...state.ship,
        storage: {
          ...state.ship.storage,
          contents: {
            ...state.ship.storage.contents,
            [action.goodType]: state.ship.storage.contents[action.goodType] - action.quantity
          }
        }
      }
    };

    case actions.LOG:
      return {
        ...state,
        logs: state.logs.concat(action.message)
      };

    default:
      return state;
  }
};



export function initializeStore(initialState = newGameState) {
  return createStore(reducer, initialState, applyMiddleware(thunk));
}
