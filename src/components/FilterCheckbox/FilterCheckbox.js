import "./FilterCheckbox.css";

const FilterCheckbox = ({ checkHandler, isChecked }) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name="shorts"
        className="checkbox__element checkbox__element_type_real"
        checked={isChecked}
        onChange={checkHandler}
      />
      <span className="checkbox__element checkbox__element_type_custom" />
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
