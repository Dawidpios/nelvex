interface State {
  count: number;
}

interface Action {
  type: 'decrement' | 'increment' | 'reset';
}


export default function counterReducer(state: State, payload: Action) {
  switch(payload.type){
    case 'decrement': {
      return {
        count: state.count - 1
      }
    }
    case 'increment': {
      return {
        count: state.count + 1
      }
    }
    case 'reset': {
      return {
        count: 0
      }
    }
  }
}