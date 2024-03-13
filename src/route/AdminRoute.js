import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";

import List from "src/pages/products/admin/ProductList";
import MachineList from "src/pages/machines/admin/MachineList";
import CompanyList from "src/pages/companies/CompanyList";

import TransactionList from "src/pages/transactions/admin/TransactionList";
import ProductTransactionList from "src/pages/product-transactions/admin/TransactionList"
import PaymentTransactionList from "src/pages/payment-transactions/admin/TransactionList"

import UserList from "src/pages/users/UserList";
// import { UserContextProvider } from "src/pages/users/UserContext";



import Homepage from "src/pages/dashboard/Homepage";
import { RedirectAs404 } from "src/utils/Utils";


const AdminPages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/* <Route exact path={`/product-list`} component={List}></Route>
        <Route exact path={`/machine-list`} component={MachineList}></Route>

        <Route exact path={`/transaction-list`} component={TransactionList}></Route>
        <Route exact path={`/product-transaction-list`} component={ProductTransactionList}></Route>
        <Route exact path={`/payment-transaction-list`} component={PaymentTransactionList}></Route>
        
        <Route exact path={`/company-list`} component={CompanyList}></Route> */}
        <Route exact path={`/user-list`} component={UserList}></Route>

        {/* <Route //Context Api added
          exact
          path={`/user-list`}
          render={() => (
            <UserContextProvider>
              <UserListPage />
            </UserContextProvider>
          )}
        ></Route> */}

        

        <Route exact path={`/`} component={Homepage}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};

export default AdminPages;
