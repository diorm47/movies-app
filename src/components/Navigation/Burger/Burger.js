import './Burger.css';

const Burger = ({ onClick }) => {
  return (
    <button
      className="burger-button"
      type="button"
      onClick={onClick}
    />
  )
};

export default Burger;
