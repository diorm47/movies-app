import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutMe.css";
import studentPhoto from "../../../images/student-photo.jpg";

const AboutMe = () => {
  return (
    <section className="about-me container" id="student">
      <SectionTitle>Студент</SectionTitle>
      <div className="about-me__info">
        <div className="about-me__bio">
          <h3 className="about-me__name">Ибрагим</h3>
          <p className="about-me__short">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/Akhtool"
            className="about-me__github"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="about-me__photo-wrapper">
          <img
            className="about-me__photo"
            src={studentPhoto}
            alt="Фотограция студента"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
