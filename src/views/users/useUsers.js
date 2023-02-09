import { createContext, useContext, useEffect, useState } from "react";

import { message } from 'antd';

import { 
  createUser as createUserApi,
  deleteUser as deleteUserApi,
  getUserData as getUserDataApi,
  updateUser as updateUserApi,
} from '../../api/users';

function useUsers() {
  // Context
  const {
    customMessage,
    users,
    setUsers,
  } = useUserContext();

  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);
  
  async function createUser(data) {
    try {
      setIsCreating(true);
      const res = await createUserApi(data);
      setIsCreating(false);

      console.log("API on Custom Hook Response - User created", res.status);

      getUserData();

      return res.status;
    } catch(err) {
      setIsCreating(false);

      return err;
    }
  }

  async function getUserData() {
    try {
      setIsLoading(true);
      const res = await getUserDataApi();
      setIsLoading(false);

      setUsers(res.data.data);

      console.log("API on Custom Hook Response - Users fetched", res.status);

      return res.status;
    } catch (err) {
      setIsLoading(false);
      customMessage('error', 'Cannot get user data. Error: ' + err);

      return err;
    }
  }

  async function deleteUser(id) {
    try {
      setIsDeleting(true);
      const res = await deleteUserApi(id);
      setIsDeleting(false);

      console.log("API on Custom Hook Response - User deleted", res.status);

      getUserData();

      return res.status;
    } catch(err) {
      setIsDeleting(false);

      return err;
    }
  }

  async function updateUser(id, data) {
    try {
      setIsUpdating(true);
      const res = await updateUserApi(id, data);
      setIsUpdating(false);

      console.log("API on Custom Hook Response - User updated", res.status);

      getUserData();

      return res.status;
    } catch(err) {
      setIsUpdating(false);

      return err;
    }
  }

  return { 
    users,
    isCreating,
    isLoading, 
    isUpdating,
    isDeleting,
    createUser,
    deleteUser,
    updateUser,

    useUserContext,
    UserContext,
    UserProvider,
  };
}

// Context
const UserContext = createContext({});

function UserProvider(props) {
  const { children } = props;
  
  const [users, setUsers] = useState([]);
  const [currID, setCurrID] = useState(-1);
  const [open, setOpen] = useState(false);
  const [modalIsNew, setModalIsNew] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const customMessage = (type, content) => {
    messageApi.destroy();
    messageApi.open({
      type: type,
      content: content,
    });
  }

  return (
    <UserContext.Provider 
      value={{
        currID,
        messageApi,
        contextHolder,
        modalIsNew,
        open,
        users,
        customMessage,
        setCurrID,
        setModalIsNew,
        setOpen,
        setUsers,
      }} 
    > 
      {children}
    </UserContext.Provider>
  )
}

function useUserContext() {
  return useContext(UserContext);
};

export {
  useUsers,
  UserContext,
  UserProvider,
  useUserContext,
}