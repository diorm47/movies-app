import './TechCards.css';

const techsList = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

const TechCards = () => {
  return (
    <ul className="tech__cards">
      {techsList.map((tech, ind) => (
        <li key={ind} className="tech__item">
          <span className="tech__card">
            {tech}
          </span>
        </li>)
      )}
    </ul>
  )
};

export default TechCards;
