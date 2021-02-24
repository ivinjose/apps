import Constants from "../.././helpers/Constants";
import './Style.css'

const Loader = () => {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    )
};

const Thanks = ({name}) => {
  return (
    <div className="thanks">
      <div>{Constants.THANKS_TEXT}</div>
      <div>{name}</div>
    </div>
  );
};

const SubmitButton = ({isLoading, action}) => {
  return(
    <div className="submit-button-wrapper">
      <div className="submit" onClick={action}>Submit</div>
      {
        isLoading &&
          <Loader />
      }
    </div>
  )
}

export { Loader, Thanks, SubmitButton };