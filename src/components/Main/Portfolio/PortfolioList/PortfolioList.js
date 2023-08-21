import PortfolioItem from '../PortfolioItem/PortfolioItem';
import './PortfolioList.css';

const projects = [
  {
    title: 'Статичный сайт',
    link: 'https://github.com/akhtool/how-to-learn'
  },
  {
    title: 'Адаптивный сайт',
    link: 'https://github.com/akhtool/russian-travel/'
  },
  {
    title: 'Одностраничное приложение',
    link: 'https://github.com/akhtool/react-mesto-api-full-gha'
  },
];

const PortfolioList = () => {
  return (
    <ul className="portfolio__list">
      {
        projects.map((project, index) => (
          <PortfolioItem key={index} progectData={project} />
        ))
      }
    </ul>
  )
};

export default PortfolioList;
