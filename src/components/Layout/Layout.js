import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children, ...props }) => {
  return (
    <>
      <Header isLogged={props.isLogged}/>
      {children}
      <Footer />
    </>
  )
};

export default Layout;
