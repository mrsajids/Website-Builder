const BlueOutlineButton = ({ onClick, text, icon, className, type }) => {
  return (
    <button
      type={type || "button"}
      className={`darkblue-outline-btn fs-14 ${
        className ? ` ${className}` : ""
      }`}
      onClick={onClick}
    >
      {icon && <>{icon}&nbsp;</>}
      {text}
    </button>
  );
};

export default BlueOutlineButton;
