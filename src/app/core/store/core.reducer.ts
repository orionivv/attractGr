import {CoreActionTypes} from './core.actions';
import {ICoreDataState, coreDataInitialState} from './core.state';

export function coreDataReducer(state = coreDataInitialState, action): ICoreDataState {
  switch (action.type) {

    case CoreActionTypes.GetTestData: {
     return {
       ...state,
       loading: true
     };
    }

    case CoreActionTypes.GetTestDataSuccessful: {
      return {
        ...state,
        loading: false,
        data: getEntitiesFromData(action.payload.data),
        city: getEntitiesFromData(action.payload.city),
        category: getEntitiesFromData(action.payload.category)
      };
    }

    case CoreActionTypes.NormalizeDataSuccessful: {
      return {
        ...state,
        normalizedData: action.payload
      };
    }

    default: {
      return state;
    }
  }
}


function getEntitiesFromData(items) {
  const entities = items.reduce((acc, item) => ({
    ...acc,
    [item.id]: item
  }), {});
  const ids = Object.getOwnPropertyNames(entities);
  return {
    entities,
    ids,
    initial: items
  };
}
