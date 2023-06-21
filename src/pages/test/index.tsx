import {
  startTransition,
  useState,
  useMemo,
  useTransition,
  useDeferredValue,
} from 'react';
import _ from 'lodash';
import { Input } from 'antd';
import './style.css';

const mockList = new Array(10000).fill(1);

function ShowText(props: any) {
  const { query } = props;

  const text = 'abcdefg';
  let children;
  if (text.indexOf(query) >= 0 && query) {
    const arr = text.split(query);
    children = (
      <div>
        {arr[0]}
        <span style={{ color: 'pink' }}>{query}</span>
        {arr[1]}
      </div>
    );
  } else {
    children = <div>{text}</div>;
  }
  return <div>{children}</div>;
}

function NewList(props: any) {
  return (
    <div>
      {mockList.map((item, index) => (
        <div key={index}>
          <ShowText query={props.query} />
        </div>
      ))}
    </div>
  );
}

const Index = () => {
  const [val1, setVal1] = useState();
  const [val2, setVal2] = useState();
  const [val3, setVal3] = useState();
  const [isPending, setIsPending] = useTransition();
  const [isTransition, setTransion] = useState(false);
  const [query, setSearchQuery] = useState('');

  

  const SetSearchQueryDebounce = useMemo(
    () => _.debounce((val1: any) => setSearchQuery(val1), 1000),
    []
  );

  /** change-input输入框 */
  const changeInput = (e: any) => {
    const val = e.target.value;
    setVal1(val);                    // 紧急更新
    startTransition(() => {          // 不紧急更新
      setSearchQuery(val);
      setVal2(val);
    });
    setIsPending(() => {
      setVal3(val);
    })
    // if (isTransition) {
    //   startTransition(() => {        // 不紧急更新
    //     setSearchQuery(val);
    //     setVal2(val);
    //   });
    // } else {
    //   // setSearchQuery(val);        // 紧急更新
    //   SetSearchQueryDebounce(val);   // 防抖
    // }
  };

  console.log(11, isPending)

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
          非紧急更新：
          <div>
            {mockList.map((item, index) => (
              <div key={index}>{val2}</div>
            ))}
          </div>
        </div>
        <div className='test-wrap-box'>
          非紧急更新：
          <div>
            {isPending
              ? mockList.map((item, index) => (
                <div key={index}>{val3}</div>
              ))
              : '正在更新中ing'
            }
          </div>
        </div>
      </div>


      <button onClick={() => setTransion(!isTransition)}>
        {isTransition ? 'transition' : 'noTransition'}
      </button>
      <div>
        {isPending ? (
          <span style={{ fontSize: 30, color: 'red' }}>isPending</span>
        ) : null}
      </div>

      <NewList query={query} />
    </div>
  );

  // const [value, setInputValue] = useState('');
  // const query = useDeferredValue(value);

  // const handleChange = e => {
  //   setInputValue(e.target.value);
  // };

  // return (
  //   <div>
  //     <span>useDeferredValue: </span>
  //     <input onChange={handleChange} placeholder="请输入" value={value} />
  //     <NewList query={query} />
  //   </div>
  // );
};

export default Index;