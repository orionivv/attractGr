import {CoreActionTypes} from './core.actions';
import { coreDataInitialState} from './core.state';

export function coreDataReducer(state = coreDataInitialState, action) {
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

    case CoreActionTypes.FilterDataSuccessful: {
      return {
        ...state,
        filteredData: action.payload,
        loading: false
      };
    }

    case CoreActionTypes.SetFilter:
    case CoreActionTypes.GetFilterSuccessful: {
      return {
        ...state,
        filter: action.payload
      };
    }

    case CoreActionTypes.FilterData: {
      return {
        ...state,
        loading: true
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
  };
}
