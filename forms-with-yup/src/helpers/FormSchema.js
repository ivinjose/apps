import * as yup from 'yup';
import Constants from "./Constants";

const Schema = yup.object().shape({
    name: yup.string()
        .typeError(Constants.ERROR_MESSAGES.NAME_REQUIRED)
        .min(2, Constants.ERROR_MESSAGES.NAME_MIN_LENGTH),
    email: yup.string()
        .email()
        .typeError(Constants.ERROR_MESSAGES.EMAIL_REQUIRED)
        .matches(Constants.EMAIL_REGEX, Constants.ERROR_MESSAGES.EMAIL_INVALID),
    username: yup.string()
        .typeError(Constants.ERROR_MESSAGES.USERNAME_REQUIRED),
    password: yup.string()
        .typeError(Constants.ERROR_MESSAGES.PASSWORD_REQUIRED)
        .oneOf([yup.ref('passwordConfirm')], Constants.ERROR_MESSAGES.PASSWORDS_MISMATCH)
        .matches(Constants.PASSWORD_REGEX, Constants.ERROR_MESSAGES.PASSWORD_INVALID),
    passwordConfirm: yup.string()
        .typeError(Constants.ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED)
        .oneOf([yup.ref('password')], Constants.ERROR_MESSAGES.PASSWORDS_MISMATCH)
        .matches(Constants.PASSWORD_REGEX, Constants.ERROR_MESSAGES.PASSWORD_INVALID)
});

const getValidationErrors = errObject => {
    let validationErrors = {};
    errObject.inner.forEach(error => {
        if(error.path){
            validationErrors[error.path] = error.message;
        }
    });
    return validationErrors;
};

const validateSchema = async ({name, email, username, password, passwordConfirm}) => {
    try{
        let isSchemaValid = await Schema.validate({
          name,
          email, 
          username,
          password,
          passwordConfirm
        }, { abortEarly: false });

        if( isSchemaValid ){
          return true;
        }
      }
      catch(err){
        return getValidationErrors(err);
      }
};

export { Schema, getValidationErrors, validateSchema }