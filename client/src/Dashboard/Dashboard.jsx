import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import {replaceText} from '../utils/replaceText';

const Dashboard = () => {
  const [numberOfFields, setNumberOfFields] = useState(1);
  const [fields, setFields] = useState([]);
  const [fieldData, setFieldData] = useState({});
  const [textArea, setTextArea] = useState('');
  const [cachedTextArea, setCachedTextArea] = useState('');

  function numberHandler(e) {
    const newValue = e.target.value;
    setNumberOfFields(val => newValue < 0 ? val : newValue);
  }
  function textHandler(e) {
    const key = e.target.name;
    const value = e.target.value;
    if (key === 'textarea') {
      setTextArea(value);
    } else {
      setFieldData(data => {return {...data, [key]: value}});
    }
  }
  function resetHandler(e) {
    setTextArea(cachedTextArea);
    setFieldData({});
  }
  function replaceHandler (e) {
    e.preventDefault();
    setCachedTextArea(textArea);
    let newText = replaceText(textArea, fieldData);
    setTextArea(newText);
  }

  useEffect(() => {
    setFields([]);
    for (let i = 0; i < numberOfFields; i++) {
      setFields(inputs => [...inputs, 
        <label key={`LABEL${i}`} htmlFor={`FIELD${i+1}`}>{`FIELD ${i+1}`}
          <input name={`FIELD${i+1}`} id={`FIELD${i+1}`} onChange={textHandler} type='text' />
        </label>] )
    }
  }, [numberOfFields, fieldData])

  return (
    <>
    <div className="dashboard-wrapper">
      <form className="input-fields">
        <label>How many input fields would you like?
          <input className="number-of-fields" type="number" value={numberOfFields} onChange={numberHandler}/>
        </label>
        {fields}
        <input type="reset" className="reset-button" onClick={resetHandler}/>
      </form>
      <div className="right-block">
        <textarea name="textarea" id="textarea" value={textArea} onChange={textHandler}/>
        <button onClick={replaceHandler}>Replace</button>
      </div>
    </div>
    </>
  )
}

export default Dashboard;