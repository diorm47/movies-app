import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";
// AboutProject — компонент с описанием дипломного проекта.
const AboutProject = (props) => {
  return (
    <section id="#project" className="project">
      <SectionTitle title={"О проекте"} />
      <ul className="project__text-list">
        <li>
          <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="project__progress">
        <p className="project__week project__week_type_green">1 неделя</p>
        <p className="project__week">4 недели</p>
        <p className="project__week-signature">Back-end</p>
        <p className="project__week-signature">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
