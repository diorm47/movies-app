import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="error container">
      <h1 className="error__title">
        404
      </h1>
      <p className="error__text">
        Страница не найдена
      </p>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="error__back"
      >
        Назад
      </button>
    </main>
  )
};

export default NotFound;
