import { Footer } from "../Footer/Footer.jsx";
import { Navbar } from "../Navbar/Navbar.jsx";

export const Layout = (props) => {

  return (
    <>
      <Navbar />
        {props.children}
      <Footer/>
    </>
  )
}
