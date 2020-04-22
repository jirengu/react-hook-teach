import React, {useState, useEffect} from 'react';
import './App.css';


function Counter() {
  const [count, setCount] = useState(0)
  const [age, setAge] = useState(20)

  // 相当于 componentDidMount 和 componentDidUpdate:
  /*
  useEffect(() => {
    console.log(`You clicked ${count} times`)
  }) //监控所有
  */

  /*
  useEffect(() => {
    console.log('挂载和更新时执行')
    return () => {
      console.log('执行清除——更新和卸载时执行')
    }
  }, [count])  //只监控count
  */

  useEffect(() => {
    console.log('挂载和更新时执行')
    return () => {
      console.log('执行清除——更新和卸载时执行')
    }
  }, [])   //都不监控，只在第一次挂载时执行一次


  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Add count</button>
      <p>You are {age} years old!</p>
      <button onClick={() => setAge(age + 1)}> Add age </button>     
    </div>
  );
}


function App() {
  const [isShow, setIsShow] = useState(true)

  return (
    <div className="App">
      <button onClick={() => setIsShow(!isShow)}>显示/隐藏Counter</button>
      {
        isShow && <Counter/>
      }
    </div>
  )
}

export default App;
