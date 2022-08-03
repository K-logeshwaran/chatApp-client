const Popup = ({handleClose,content}) => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>x</span>
          <div className="options">
            {content}
          </div>
        </div>
      </div>
    );
  };

        

export default Popup;