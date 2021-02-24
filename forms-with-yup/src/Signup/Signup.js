import './Signup.css';
import { useState } from 'react';
import ApiHelper from "../helpers/ApiHelper";
import Input from "../Input";
import Constants from "../helpers/Constants";
import { Thanks, SubmitButton } from "./HelperComponents";
import { validateSchema } from "../helpers/FormSchema";

function Signup() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [usernameUnavailableError, setUsernameUnavailableError] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [passwordConfirmError, setPasswordConfirmError] = useState(null)

  const usernameCb = name => { setUsername(name); setUsernameUnavailableError(null); }
  const fetchUsernames = async () => await ApiHelper.fetchUsernames(username);

  const submit = async () => {
    setLoading(true);
    const { usernames } = await fetchUsernames();
    if( usernames && usernames.includes(username) ){
      setUsernameUnavailableError(Constants.ERROR_MESSAGES.USERNAME_UNAVAILABLE);
    }else{
      setUsernameUnavailableError(null);
      const schemaValidationResult = await validateSchema({name, email, username, password, passwordConfirm});
      if( schemaValidationResult === true ){
        setEditMode(false);
      }else{
        setErrorMessagesOnValidation(schemaValidationResult);
      }
    }
    setLoading(false);
  }

  const setErrorMessagesOnValidation = schemaValidationResult => {
    for(const key in schemaValidationResult){
      switch(key){
        case 'name':
          setNameError(schemaValidationResult[key]);
          break;
        case 'email':
          setEmailError(schemaValidationResult[key]);
          break;
        case 'username':
          setUsernameError(schemaValidationResult[key]);
          break;
        case 'password':
          setPasswordError(schemaValidationResult[key]);
          break;
        case 'passwordConfirm':
          setPasswordConfirmError(schemaValidationResult[key]);
          break;
      }
    }
  }
  
  return (
    <div className="signup">
      {
        editMode?
        <div className="form">
          <Input type="text" placeholder="Name" id="name" isMandatory={true} onChangeCb={setName} errorMessage={nameError}/>
          <Input type="text" placeholder="Email" id="email" regexErrorMessage={Constants.ERROR_MESSAGES.EMAIL_INVALID} onChangeCb={setEmail} regex={Constants.EMAIL_REGEX} errorMessage={emailError} />
          <Input type="text" placeholder="Username" id="username" isMandatory={true} onChangeCb={usernameCb} errorMessage={usernameUnavailableError||usernameError}/>
          <Input type="password" placeholder="Password" id="password" isMandatory={true} onChangeCb={setPassword} regex={Constants.PASSWORD_REGEX} regexErrorMessage={Constants.ERROR_MESSAGES.PASSWORD_WEAK} errorMessage={passwordError}/>
          <Input type="password" placeholder="Confirm password" id="password-confirm" isMandatory={true} onChangeCb={setPasswordConfirm} errorMessage={passwordConfirmError}/>
          <br/>
          <SubmitButton action={submit} isLoading={isLoading} />
        </div>
        :<Thanks name={name} />
      }
    </div>
  );
}

export default Signup;