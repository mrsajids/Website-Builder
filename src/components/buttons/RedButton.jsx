const RedButton = ({ onClick, text, icon, className }) => {
  return (
    <button
      type="button"
      className={`main-btn red-main-btn fs-14 main-btn-padding ${
        className ? ` ${className}` : ""
      }`}
      onClick={onClick}
    >
      {icon && <>{icon}&nbsp;</>}
      {text}
    </button>
  );
};

export default RedButton;
