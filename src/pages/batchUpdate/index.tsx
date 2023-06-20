// react18 默认都是开启批量更新，特殊情况（async  await）不会批量更新
// 批量更新：会把更新函数会放到一个队列里，然后合并队列，触发一个单独的 re-render。即合并为一次渲染更新

import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

const BatchUpdate = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 1) react中的钩子函数（批量更新）
  useEffect(() => {
    setCount1(count => count + 1);
    setCount2(count => count + 1);
  }, []);
  // 2) React事件函数（批量更新）
  const fn1 = () => {
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  }
  // 3) setTimeout（批量更新）
  const fn2 = () => {
    setTimeout(() => {
      setCount1(count1 + 1);
      setCount2(count2 + 1);
    });
  }
  // 4) promise（批量更新）
  const fn3 = () => {
    Promise.resolve().then(() => {
      setCount1(count1 + 1);
      setCount2(count2 + 1);
    });
  }
  // 5) 原生js事件（批量更新）
  useEffect(() => {
    document.getElementById('btn')?.addEventListener('click', () => {
      setCount1(count => count + 1);
      setCount2(count => count + 1);
    });
  }, []);

  // 1) async await （非批量更新） 
  const fn4 = async () => {
    await setCount1(count => count + 1);    // 更新一次
    await setCount2(count => count + 1);    // 更新一次
  }
  // X) flushSync：如果仍然希望setState之后立即重新渲染，只需要使用 flushSync 包裹
  const fn5 = () => {
    // (1) 非批量更新
    flushSync(() => {
      setCount1(count => count + 1);    // 更新一次
    });
    flushSync(() => {
      setCount2(count => count + 1);    // 更新一次
    });
    // (2) flushSync 函数内部的多个 setState 还是批量更新（合并为一次渲染更新）
    flushSync(() => {
      setCount1(count => count + 1);
      setCount2(count => count + 1);
    });
  }

  console.log('渲染了');

  return (
    <div>
      <div>count1: {count1}</div>
      <div>count2: {count2}</div> <br />

      批量更新：<br />
      <button onClick={fn1}>React事件函数</button>
      <button onClick={fn2}>setTimeout</button>
      <button onClick={fn3}>promise</button>
      <button id="btn">原生事件绑定</button> <br /><br />

      非批量更新：<br />
      <button onClick={fn4}>async await</button>
      <button onClick={fn5}>flushSync</button>
    </div>
  );
}

export default BatchUpdate;