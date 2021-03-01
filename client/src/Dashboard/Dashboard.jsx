import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import {replaceText} from '../utils/replaceText';

const Dashboard = () => {
  const [numberOfFields, setNumberOfFields] = useState(1);
  const [fields, setFields] = useState([]);
  const [fieldData, setFieldData] = useState({});
  const [templateText, setTemplateText] = useState('');
  const [textToDisplay, setTextToDisplay] = useState('');
  const [replaced, setReplaced] = useState(false);

  function numberHandler(e) {
    const newValue = e.target.value;
    setNumberOfFields(val => newValue < 0 ? val : newValue);
  }
  function textHandler(e) {
    const key = e.target.name;
    const value = e.target.value;
    if (key === 'textarea' && !replaced) {
      setTemplateText(value);
    } else {
      setFieldData(data => {return {...data, [key]: value}});
    }
  }
  function resetFields(e) {
    setFieldData(data=> {
      for (let key in data) {
        data[key] = '';
      }
      return data;
    });
  }
  function resetReplace(e) {
    e.preventDefault();
    setTextToDisplay(templateText);
    setReplaced(false);
  }

  function replaceHandler (e) {
    e.preventDefault();
    let newText = replaceText(templateText, fieldData);
    setTextToDisplay(newText);
    setReplaced(true);
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
        <input type="reset" className="reset-button" value="Reset fields" onClick={resetFields}/>
      </form>
      <div className="right-block">
        <textarea name="textarea" id="textarea" value={replaced ? textToDisplay : templateText} onChange={textHandler}/>
        <button onClick={replaced ? resetReplace : replaceHandler}>{replaced ? 'Go back' : 'Replace'}</button>
      </div>
    </div>
    </>
  )
}

export default Dashboard;