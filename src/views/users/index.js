import React from "react";

import { 
  Button,
  Space,
  Table,
} from 'antd';
import { Link, Outlet } from 'react-router-dom';

import styles from './users.module.scss';

import { useUsers, useUserContext } from './useUsers';

const { Column } = Table;

export default function Users() {
  // Context
  const {
    contextHolder,
  } = useUserContext();

  // Custom Hooks
  const {
    users,
    isLoading,
    isDeleting,
  } = useUsers();

  // Main function
  return(
    <div>
      {/* Message Context */}
      {contextHolder}

      {/* Main Container */}
      <div className={styles['users__container']}>
        <div className={styles['users__container--flex-right']}>
          <Link to='/users/create'>
            <Button className={styles['users__primary-button']}> Add User </Button>
          </Link>
        </div>
        <Table 
          className={styles['users__table']}
          dataSource={users}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          rowKey="id"
          scroll={{ x: 'max-content', y: 'calc(100vh - 400px)' }}
        >
          <Column title="ID" dataIndex="id" key="id" width={75}/> {}
          <Column 
            dataIndex="avatar"
            key="avatar"
            title="Avatar"
            render={(item, index) => (
              <img src={item} key={'image-#' + index}/>
            )}
          />
          <Column dataIndex="email" key="email" title="Email" />
          <Column dataIndex="first_name" key="first_name" title="First Name" />
          <Column dataIndex="last_name" key="last_name" title="Last Name" />
          <Column
            key="actions"
            title="Actions"
            render={(item) => (
              <Space key='action-space' size="middle">
                <Link to={`/users/edit/${item.id}`}>
                  <Button className={styles['users__primary-button']} key='edit-button'> 
                    Edit
                  </Button>
                </Link>
                {
                  isDeleting ? (
                    <Button
                      className={styles['users__warning-button']}
                      disabled
                      key='del-button-deleting'
                      loading
                    > 
                      Delete
                    </Button>
                  ) : (
                    <Link to={`/users/delete/${item.id}`}>
                      <Button
                        key='del-button'
                        className={styles['users__warning-button']}
                        // onClick={() => handleClickDeleteUser(item.id)}
                      > 
                        Delete
                      </Button>
                    </Link>
                  )
                }
              </Space>
            )}
          />
        </Table>
      </div>
      <Outlet />
    </div>
  );
}