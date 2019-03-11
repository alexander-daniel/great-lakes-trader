import * as actions from './actions';
import { UI_SCENES } from './types';
import { getMarketPrices, getNextSeason } from './utils';

const newGameState = {
  logs: [],
  currentScene: UI_SCENES.INTRO,
  hasBorrowed: false,

  travelMessage: '',
  travelChoices: null,
  onSelect: null,

  modifiers: {
    storm: 1,
    inspection: 0
  },

  date: {
    day: 1,
    season: 'spring',
    year: 1698
  },

  cash: 500,
  loan: 1000,
  bank: 0,

  currentIsland: {
    islandID: 0,
    market: getMarketPrices()
  },

  destinations: [
    {
      id: 0,
      name: 'Québec',
      hasBank: false,
      hasWarehouse: true,
      hasMoneyLender: true
    },
    {
      id: 1,
      name: 'Montreal',
      hasBank: true,
      hasWarehouse: false,
      hasMoneyLender: false
    },
    {
      id: 4,
      name: ' Fort Frontenac',
      hasBank: false,
      hasWarehouse: false,
      hasMoneyLender: false
    },
    {
      id: 5,
      name: 'Oswego',
      hasBank: false,
      hasWarehouse: false,
      hasMoneyLender: false
    },
    {
      id: 2,
      name: 'Fort Michillimakinac',
      hasBank: false,
      hasWarehouse: false,
      hasMoneyLender: false
    },
    {
      id: 3,
      name: 'Detroit',
      hasBank: false,
      hasWarehouse: false,
      hasMoneyLender: false
    },
  ],

  ship: {
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
    contents: {
      general: 0,
      pelts: 0,
      armaments: 0,
      opium: 0,
    }
  }
};

const reducer = (state = newGameState, action) => {
  switch (action.type) {

    case actions.UPDATE_CASH:
      return {
        ...state,
        cash: action.cash
      };

    case actions.SET_SHIP_STOCKS:
      return {
        ...state,
        ship: {
          ...state.ship,
          storage: {
            ...state.ship.storage,
            contents: {
              ...state.ship.storage.contents,
              ...action.contents
            }
          }
        }
      };

    case actions.SET_DATE: {
      const { date } = state;
      const currentDate = date.day;
      const currentSeason = date.season;
      const currentYear = date.year;

      const nextDate = {
        ...date
      };

      // was the last day of the season
      if (currentDate === 15) {
        // switch season, reset date to 1
        nextDate.season = getNextSeason(currentSeason);
        nextDate.day = 1;

        // Last day of last season
        if (currentSeason === 'winter') {
          // increment year
          nextDate.year = currentYear + 1;
        }
      }

      else {
        // only increment date
        nextDate.day = currentDate + 1;
      }

      return {
        ...state,
        date: nextDate
      };
    }

    case actions.SET_CURRENT_SCENE:
      return {
        ...state,
        currentScene: action.sceneType
      };

    case actions.ARRIVE:
      return {
        ...state,
        hasBorrowed: false,
        bank: state.bank + (state.bank * 0.01),
        loan: state.loan + (state.loan * 0.024),
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

    case actions.WITHDRAW_FROM_WAREHOUSE:
      return {
        ...state,
        ship: {
          ...state.ship,
          storage: {
            ...state.ship.storage,
            contents: {
              ...state.ship.storage.contents,
              [action.goodType]: state.ship.storage.contents[action.goodType] + action.quantity
            }
          }
        },
        warehouse: {
          ...state.warehouse,
          contents: {
            ...state.warehouse.contents,
            [action.goodType]: state.warehouse.contents[action.goodType] - action.quantity
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

    case actions.STORE_IN_WAREHOUSE:
    return {
      ...state,
      ship: {
        ...state.ship,
        storage: {
          ...state.ship.storage,
          contents: {
            ...state.ship.storage.contents,
            [action.goodType]: state.ship.storage.contents[action.goodType] - action.quantity
          }
        }
      },
      warehouse: {
        ...state.warehouse,
        contents: {
          ...state.warehouse.contents,
          [action.goodType]: state.warehouse.contents[action.goodType] + action.quantity
        }
      }
    };

    case actions.SET_TRAVEL_MESSAGE:
      return {
        ...state,
        travelMessage: action.message,
        travelChoices: action.choices,
        onSelect: action.onSelect
      };

    case actions.BANK_DEPOSIT:
      return {
        ...state,
        bank: state.bank + action.amount,
        cash: state.cash - action.amount
      };

    case actions.BANK_WITHDRAW:
      return {
        ...state,
        bank: state.bank - action.amount,
        cash: state.cash + action.amount
      };

    case actions.UPGRADE_SHIP_STORAGE:
      return {
        ...state,
        ship: {
          ...state.ship,
          storage: {
            ...state.ship.storage,
            max: action.max
          }
        }
      };

    case actions.REPAY:
      return {
        ...state,
        loan: state.loan - action.amount,
        cash: state.cash - action.amount
      };

    case actions.BORROW:
      return {
        ...state,
        hasBorrowed: true,
        loan: state.loan + action.amount,
        cash: state.cash + action.amount
      };

    default:
      return state;
  }
};

export default reducer;
