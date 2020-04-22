import React from 'react';
import ReactDOM from 'react-dom';

//参考文章 https://github.com/brickspert/blog/issues/26

let memoizedState = []; 
let cursor = 0; 
window.memoizedState = memoizedState;
window.cursor = cursor;

function render() {
  cursor = 0;
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}


function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}




function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('jirengu'); 

  useEffect(() => {
    console.log('update', count)
  }, [count])

  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Add count</button> 
      <p>You name is {name}</p>
      <button onClick={() => setName(name+'!')}> Modify name</button>   
    </div>
  );
}


export default App;
