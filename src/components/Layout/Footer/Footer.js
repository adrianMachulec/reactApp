import { useContext } from "react";
import ThemeContext from "../../../context/themeContext";

function Footer(props) {

    const theme = useContext(ThemeContext)

  return (
    <div className={`text-center mt-3 text-${theme.color}`}>Noclegi 2023</div>
  );
}

export default Footer;
