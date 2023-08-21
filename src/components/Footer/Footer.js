import "./Footer.css";
// Footer — презентационный компонент, который отрисовывает подвал.
const Footer = (props) => {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__date">© 2023</p>
        <ul className="footer__list">
          <li>
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Akhtool"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
