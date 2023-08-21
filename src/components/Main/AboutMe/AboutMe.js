import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutMe.css";
import photo from "../../../images/about-me__photo.jpg";
// AboutMe — компонент с информацией о студенте.
const AboutMe = (props) => {
  return (
    <section className="about-me">
      <SectionTitle title={"Студент"} />
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__title">Ибрагим</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h3>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/Akhtool"
            className="about-me__github-link"
          >
            Github
          </a>
        </div>
        <img className="about-me__img" src={photo} alt="Фото студента" />
      </div>
    </section>
  );
};

export default AboutMe;
