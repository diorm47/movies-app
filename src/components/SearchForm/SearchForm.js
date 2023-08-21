import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'
import { MESSAGE_EMPTY_QUERRY } from '../../constants/constants';

// Логика валидации формы для страниц всех фильмов и сохраненных фильмов намерено отличается,
// чтобы была возможность сбросить поисковый фильтр и отобразить все сохраненные фильмы
const SearchForm = ({ searchParams, handleSubmit, setSearchParams, isRequired = true, isEmptyQuerry }) => {
  const [searchValue, setSearchValue] = useState(searchParams.querry);
  const [isShortsChecked, setIsShortsChecked] = useState(searchParams.includeShorts);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  }

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked);
    setSearchParams({...searchParams, includeShorts: !searchParams.includeShorts});
  }

  useEffect(() => {
    setSearchValue(searchParams.querry);
    setIsShortsChecked(searchParams.includeShorts);
  }, [searchParams])

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={handleSubmit}
        noValidate

      >
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
          <button
            className="search__submit"
            type="submit"
            >Поиск</button>
          
        </fieldset>

        <span className="search__error-message">
          {
            isEmptyQuerry ? MESSAGE_EMPTY_QUERRY : ""
          }
        </span>

        <FilterCheckbox
          checkHandler={handleShortsCheck}
          isChecked={isShortsChecked}
        />
      </form>
    </section>
  )
};

export default SearchForm;
