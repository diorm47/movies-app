import { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { EMPTY_SEARCH_QUERY_MESSAGE } from "../../constants/constants";
// SearchForm — форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
const SearchForm = ({
  searchParams,
  handleSubmit,
  setSearchParams,
  isRequired = true,
  isEmptyQuerry,
}) => {
  const [searchValue, setSearchValue] = useState(searchParams.querry);
  const [isShortsChecked, setIsShortsChecked] = useState(
    searchParams.includeShorts
  );

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked);
    setSearchParams({
      ...searchParams,
      includeShorts: !searchParams.includeShorts,
    });
  };

  useEffect(() => {
    setSearchValue(searchParams.querry);
    setIsShortsChecked(searchParams.includeShorts);
  }, [searchParams]);

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="search__request">
          <input
            className="search__input"
            type="text"
            name="querry"
            placeholder="Фильм"
            onChange={handleChange}
            value={searchValue}
            required={isRequired}
          />
          <button className="search__submit" type="submit">
            Поиск
          </button>
        </fieldset>

        <span className="search__error-message">
          {isEmptyQuerry ? EMPTY_SEARCH_QUERY_MESSAGE : ""}
        </span>

        <FilterCheckbox
          checkHandler={handleShortsCheck}
          isChecked={isShortsChecked}
        />
      </form>
    </section>
  );
};

export default SearchForm;
