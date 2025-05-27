const Spinner = ({ text = null, className = "" }) => {
  return (
    <div className={`spinner-container ${className}`}>
      <div className="spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Spinner;
 