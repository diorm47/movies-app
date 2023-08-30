import "./MovieCardButton.css";

const MovieCardButton = ({ onClickHandler, typeClass, children }) => {
  const buttonModificator = typeClass ? "movie-card__button_type_like" : "";

  return (
    <button
      className={`movie-card__button ${buttonModificator}`}
      type="button"
      onClick={onClickHandler}
    >
      {typeClass ? "" : children}
    </button>
  );
};

export default MovieCardButton;
