import {
  startTransition,
  useState,
  useTransition,
  useDeferredValue,
} from 'react';
import { Input } from 'antd';
import './style.css';

const mockList = new Array(10000).fill(1);

const Index = () => {
  const [val1, setVal1] = useState();
  const [val2, setVal2] = useState();
  const [val3, setVal3] = useState();
  const [isPending, startTransition2] = useTransition(); // isPending:当前处理过渡状态
  const val4 = useDeferredValue(val1); // 不紧急更新

  /** change-input输入框 */
  const changeInput = (e: any) => {
    const val = e.target.value;
    setVal1(val);                    // 紧急更新
    startTransition(() => {          // 不紧急更新
      setVal2(val);
    });
    startTransition2(() => {        // 不紧急更新
      setVal3(val);
    })
  };

  return (
    <div className='test'>
      <Input value={val1} onChange={changeInput} placeholder="输入搜索内容" />
      <div className='test-wrap'>
        <div className='test-wrap-box'>
          紧急更新：
          <div>
            {mockList.map((item, index) => (
              <div key={index}>{val1}</div>
            ))}
          </div>
        </div>
        <div className='test-wrap-box'>
          startTransition 非紧急更新：
          <div>
            {mockList.map((item, index) => (
              <div key={index}>{val2}</div>
            ))}
          </div>
        </div>
        <div className='test-wrap-box'>
          useTransition 非紧急更新：
          <div>
            {!isPending
              ? mockList.map((item, index) => (
                <div key={index}>{val3}</div>
              ))
              : '正在更新中ing'
            }
          </div>
        </div>
        <div className='test-wrap-box'>
          useDeferredValue 非紧急更新：
          <div>
            {mockList.map((item, index) => (
              <div key={index}>{val4}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;