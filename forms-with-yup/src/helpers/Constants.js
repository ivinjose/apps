export default {
    ERROR_MESSAGES: {
        NAME_REQUIRED: "Please enter name",
        NAME_MIN_LENGTH: "Name must be at least 2 characters",

        EMAIL_REQUIRED: "Please enter email",
        EMAIL_INVALID: "Email doesnt look right",

        USERNAME_REQUIRED: "Please enter Username",
        USERNAME_UNAVAILABLE: "This username is already taken",

        PASSWORD_REQUIRED: "Please enter password",
        PASSWORD_INVALID: "Password doesnt look right",
        PASSWORD_WEAK: "Password must be strong! It must contain atleast one uppercase letter, one lowercase letter, and one number. e.g `Open1234`",
        PASSWORDS_MISMATCH: 'Both passwords should match',

        PASSWORD_CONFIRM_REQUIRED: "Please confirm the password",
    },
    EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEX: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+/,
    
    THANKS_TEXT: "Thank you,"
}