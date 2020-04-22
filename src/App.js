import React from 'react';
import ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

//初尝试
/*
function useState(initValue) {
  let state = initValue;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}
*/


//简易版的useState 与 useEffect
/*
let state;
function useState(initValue) {
  state = state || initValue;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}


let oldDeps;
function useEffect(callback, deps) {
  const hasChangedDeps = oldDeps ? !deps.every((el, i) => el === oldDeps[i]) : true;
  if(!deps || hasChangedDeps ) {
    callback();
    oldDeps = deps;
  }
}


*/


//多状态

let states = [];
let cursor = 0;

function useState(initValue) {
  states[cursor] = states[cursor] || initValue;
  function setState(newState) {
    states[cursor] = newState;
    render();
  }
  return [states[cursor++], setState];
}

function useEffect(callback, deps) {
  let oldDeps = states[cursor];
  const hasChangedDeps = oldDeps ? !deps.every((el, i) => el === oldDeps[i]) : true;
  if(!deps || hasChangedDeps) {
    callback();
    states[cursor] = deps;
  }
  cursor++
}




function App() {
  console.log('render app')
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('update', count)
  }, [count])

  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Add count</button>   
    </div>
  );
}


export default App;
