import React from 'react';

import { Route } from 'react-router-dom';

export default function routing(route, index) {
  return(
    <Route 
      element={<route.component key={'Component ' + route.name + index} />}
      exact={route.exact} 
      key={'Route ' + route.name + index} 
      path={route.path} 
    >
      {
        
        route.routes?.map((route, index) => (
          routing(route, index)
        ))
      }
    </Route>
  )
}