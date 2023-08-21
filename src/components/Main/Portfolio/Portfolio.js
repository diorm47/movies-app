import './Portfolio.css'
import PortfolioList from './PortfolioList/PortfolioList';

const Portfolio = () => {
  return (
    <section className="portfolio container">
      <h2 className="portfolio__title">Портфолио</h2>
      <PortfolioList />
    </section>
  )
};

export default Portfolio;
