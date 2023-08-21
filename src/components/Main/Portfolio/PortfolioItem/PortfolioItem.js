import './PortfolioItem.css';

const PortfolioItem = ({ progectData }) => {
  return (
    <li className="portfolio__item">
      <a
        href={progectData.link}
        className="portfolio__link"
        target="_blank"
        rel="noreferrer"
      >
        {progectData.title}
      </a>
    </li>
  )
};

export default PortfolioItem;
