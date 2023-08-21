import "./FilterCheckbox.css";

const FilterCheckbox = ({ checkHandler, isChecked }) => {
  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          checked={isChecked}
          onChange={checkHandler}
        />
        <span className="filter-checkbox__text">Короткометражки</span>
      </div>
    </div>
  );
};

export default FilterCheckbox;
