import SectionTitle from '../SectionTitle/SectionTitle';
import TechCards from './TechCards/TechCards';
import './Techs.css'

const Techs = () => {
  return (
    <section className="tech" id="tech">
      <div className="tech__wrapper container">
        <SectionTitle>Технологии</SectionTitle>
        <h3 className="tech__title">
          7 технологий
        </h3>
        <p className="tech__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <TechCards />
      </div>
    </section>
  )
};

export default Techs;
