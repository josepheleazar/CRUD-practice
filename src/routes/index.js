import error from './error';
import homepage from './homepage';
import users from './users';

const routes = [
  {
    
    ...error,
  },
  {
    ...homepage,
  },
  {
    ...users,
  },
];

export default routes;