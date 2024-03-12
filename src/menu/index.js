import adminMenu from "./adminMenu";
import merchantMenu from "./merchantMenu";
import operatorMenu from "./operatorMenu";

import { Redirect } from "react-router-dom";



const role = sessionStorage.getItem("role");
const menu = () => {
    switch (role) {
        case "Admin":
            return adminMenu;
        case "Merchant":
            return merchantMenu;
        case "Operator":
            return operatorMenu;
        default:
            return <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
    }
}
export default menu;
  