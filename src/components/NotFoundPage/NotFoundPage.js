import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }, [navigate]);
  return (
    <main className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <h3 className="not-found-page__subtitle">Страница не найдена</h3>
      <Link to="/" className="not-found-page__link">
        Назад
      </Link>
    </main>
  );
};

export default NotFoundPage;
