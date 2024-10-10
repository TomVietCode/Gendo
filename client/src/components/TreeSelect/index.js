import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const App = ({data}) => {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  
  return (
    <TreeSelect
      style={{
        width: '100%',
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 500,
        overflow: 'auto',
      }}
      treeData={data}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default App;
  