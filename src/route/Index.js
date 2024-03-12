import { Redirect } from "react-router-dom";

import AdminPages from "./AdminRoute";
import MerchantPages from "./MerchantRoute";
import OperatorPages from "./OperatorRoute";

const role = sessionStorage.getItem("role");
const Pages = () => {
  switch (role) {
    case "Admin":
      return <AdminPages/>;
    case "Operator":
      return <OperatorPages/>
    case "Merchant":
      return <MerchantPages/>
    default:
      return <Redirect to={`/auth-login`}></Redirect>
  }
}

export default Pages;