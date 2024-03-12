import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Homepage from "src/pages/dashboard/MerchantHomepage";
import ProductList from "src/pages/products/merchant/ProductList";
import SlotList from "src/pages/slots/merchant/SlotList"
import TransactionList from "src/pages/transactions/merchant/TransactionList"
import ProductTransactionList from "src/pages/product-transactions/merchant/TransactionList"
import PaymentTransactionList from "src/pages/payment-transactions/merchant/TransactionList"
import MachineList from "src/pages/machines/merchant/MachineList";

import { RedirectAs404 } from "src/utils/Utils";


const MerchantPages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={`/product-list`} component={ProductList}></Route>
        <Route exact path={`/slot-list`} component={SlotList}></Route>
        <Route exact path={`/transaction-list`} component={TransactionList}></Route>
        <Route exact path={`/product-transaction-list`} component={ProductTransactionList}></Route>
        <Route exact path={`/payment-transaction-list`} component={PaymentTransactionList}></Route>
       
        <Route exact path={`/users-list`} component={TransactionList}></Route>
        <Route exact path={`/machine-list`} component={MachineList}></Route>

        <Route exact path={`/`} component={Homepage}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};

export default MerchantPages;