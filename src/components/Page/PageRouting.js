import React from 'react';

import { Routes } from 'react-router-dom';

import routes from '../../routes';
import routing from '../../utils/routing';

export default function PageRouting() {
  return(
    <Routes key='Routes'>
      {
        routes.map((route, index) => (
          routing(route, index)
        ))
      }
    </Routes>
  )
}