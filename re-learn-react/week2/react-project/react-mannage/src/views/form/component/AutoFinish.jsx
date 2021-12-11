import React, { useState } from "react";
import { AutoComplete } from "antd";

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat)
})

const AutoFinish = () => {

  

  const [options, setOptions] = useState([])
  const [value, setValue] = useState('')
  const onSelect = (values) => {
    setValue(values)
  }
  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    )
  }



  return (
    <>
    <AutoComplete
      options={options}
      style={{
        width: 200,
      }}
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="input here"
      value = { value }
    />
    </>
  );
};

export default AutoFinish;
