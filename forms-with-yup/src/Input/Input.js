import { useState } from 'react';
import './Input.css';

function Input({type, id, placeholder, className, subText, regexErrorMessage, errorMessage, isMandatory, regex, onChangeCb}){

  if( isMandatory && !regex){
    regexErrorMessage = "Please fill out the field";
  }

  const [ isValid, setValidity ] = useState(true);
  const validate = value => regex.test(value);

  const onBlur = event => {
    const { value } = event.target;
    const trimmedValue = value? value.trim(): null;
    const isValid = regex? validate(trimmedValue, regex) : (isMandatory && !trimmedValue)? false: true;

    setValidity(isValid);
  }

  const onChange = event => {
    const { value } = event.target;
    const trimmedValue = value? value.trim(): null;
    if( trimmedValue ){
      setValidity(true);
    }
    onChangeCb && onChangeCb(trimmedValue, event);
  }

  return(
    <div className="input-wrapper">
      <input type={type} placeholder={placeholder} id={id} className="input" onBlur={onBlur} onChange={onChange} />
      {subText && <div className="sub-text">{subText}</div> }
      {regexErrorMessage && !isValid && <div className="error">{regexErrorMessage}</div> }
      {errorMessage && <div className="error">{errorMessage}</div> }
    </div>
  );
}

export default Input;