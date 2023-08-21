import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__title-container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a href="#project" className="promo__link">
          Узнать больше
        </a>
      </div>
      <div className="promo__image"></div>
    </section>
  );
};

export default Promo;
