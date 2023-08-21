import "./Portfolio.css";
// Portfolio — компонент со ссылками на другие проекты.
const Portfolio = (props) => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li>
          <a
            href="https://github.com/akhtool/how-to-learn"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            Статичный сайт
          </a>
        </li>
        <li>
          <a
            href="https://github.com/akhtool/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a
            href="https://github.com/akhtool/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
