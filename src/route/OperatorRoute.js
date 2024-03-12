import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { RedirectAs404 } from "src/utils/Utils";


const OperatorPages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};

export default OperatorPages;