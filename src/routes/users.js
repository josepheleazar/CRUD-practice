import Users from '../views/users';
import UserModal from '../views/users/UserModal';

export default {
  exact: true,
  name: 'Users',
  path: '/users',
  component: Users,
  routes: [
    {
      exact: true,
      name: 'Create Modal',
      path: "/users/create",
      component: UserModal,
    },
    {
      exact: true,
      name: 'Edit Modal',
      path: "/users/edit/:id",
      component: UserModal,
    },
    {
      exact: true,
      name: 'Delete Modal',
      path: "/users/delete/:id",
      component: UserModal,
    }
  ]
};