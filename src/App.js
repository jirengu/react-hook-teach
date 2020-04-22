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
