import { useState, startTransition } from 'react';
import { Input } from 'antd';

const NotUrgentUpdate = () => {
  const [val1, setVal1] = useState();
  const [val2, setVal2] = useState();

  const changeValue = (e: any) => {
    const val = e.target.value;
    setVal1(val);             // 紧急更新
    startTransition(() => {   // 不紧急更新
      setVal2(val);
    }); 
  };

  return (
    <div>
      <Input value={val1} onChange={changeValue} />
      <p>紧急更新：{val1}</p>
      <p>非紧急更新：</p>
      <div>
        {Array(50000)
          .fill('')
          .map((item, index) => (
            <div key={index}>{val2}</div>
          ))}
      </div>
    </div>
  );
};

export default NotUrgentUpdate;
