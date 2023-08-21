import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css'

const AboutProject = () => {
  return (
    <section className="about container" id="about">
      <SectionTitle>О проекте</SectionTitle>
      <div className="about__plan">
        <div className="about__segment">
          <h3 className="about__subtitle">
            Дипломный проект включал 5&#160;этапов
          </h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__segment">
          <h3 className="about__subtitle">
            На выполнение диплома ушло 5&#160;недель
          </h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__progress">
        <div className="about__week about__week_type_first">
          <span className="about__week-lasts about__week-lasts_type_first">1 неделя</span>
          <span className="about__week-title">Back-end</span>
        </div>
        <div className="about__week about__week_type_other">
          <span className="about__week-lasts about__week-lasts_type_other">4 недели</span>
          <span className="about__week-title">Front-end</span>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;
