import { useEffect, useState } from 'react';

import { 
  Upload,
  Typography
} from 'antd';
import { useNavigate } from 'react-router-dom';

import useImage from "./useImage";
import { useUsers, useUserContext } from './useUsers';

import CustomModal from '../../components/Modal';
import formDataToObj from "../../utils/formDataToObj";
import genID from "../../utils/genID";

import styles from './users.module.scss';

export default function UserModal() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState('none');
  const [confirmText, setConfirmText] = useState('OK');
  const [titleText, setTitleText] = useState('Open Modal');
  
  useEffect(() => {
    const pathName = window.location.pathname.split('/');
    setModalType(pathName[2]);

    switch(pathName[2]) {
      case 'create': {
        setConfirmText('Add');
        setTitleText('Create new user');
        setCurrID(genID(users));
        break;
      }
      case 'edit': {
        setConfirmText('Save');
        setTitleText('Edit user');
        setCurrID(Number(pathName[3]));
        break;
      }
      case 'delete': {
        setConfirmText('Yes');
        setTitleText('Delete user');
        break;
      }
    }
  }, [])

  // Context
  const {
    currID,
    customMessage,
    setCurrID,
  } = useUserContext();

  // Custom Hooks
  const {
    imageUrl,
    uploadButton,
    beforeUpload,
    handleImageChange,
  } = useImage();

  const { 
    users,
    isCreating,
    isDeleting,
    isUpdating,
    createUser,
    deleteUser,
    updateUser,
  } = useUsers();

  // Functions -- START
  // New Modal
  const handleNewModalOk = async (event) => {
    event.preventDefault();
    const form = event.target
    const data = formDataToObj(form);

    data.id = currID;
    data.avatar = 'https://reqres.in/img/faces/1-image.jpg';
    const res = await createUser(data);
    
    if(res === 201) {
      customMessage('success', 'User is added to the database');
      form.reset();
      navigate('/users');
    } else {
      customMessage('error', `An error occured: ${res}`);
    }
  };

  function ModalNewContent() {
    return(
      <>
        <form id='newForm' className={styles['users__form']} onSubmit={handleNewModalOk}>
          <div>
            <Typography> ID: {currID} </Typography>
          </div>
          <div>
            <Typography> Avatar: </Typography>
          </div>
          <div> 
            {UploadProp()} 
          </div>
          <div>
            <Typography> Email: </Typography>
            <input id="new_email" name="email" type="email" defaultValue='' required minLength={2} maxLength={62} />
          </div>
          <div>
            <Typography> First Name: </Typography>
            <input id="new_first_name" name="first_name" type="text" defaultValue='' required minLength={2} maxLength={50} />
          </div>
          <div>
            <Typography> Last Name: </Typography>
            <input id="new_last_name" name="last_name" type="text" defaultValue='' required minLength={2} maxLength={50} />
          </div>
        </form>
      </>
    );
  }

  // Edit Modal
  const handleEditModalOk = async (event) => {
    event.preventDefault();
    const form = event.target
    const data = formDataToObj(form);
    
    data.avatar = 'https://reqres.in/img/faces/1-image.jpg';

    const dataJSON = JSON.stringify(data);
    const res = await updateUser(currID, dataJSON);
    
    if(res === 200) {
      customMessage('success', 'User is updated on the database');
      form.reset();
      navigate('/users');
    } else {
      customMessage('error', `An error occured: ${res}`);
    }
  };

  function ModalEditContent() {
    const currentID = window.location.pathname.split('/')[3];
    const currUser = users.find(item => Number(item.id) === Number(currentID));

    return(
      <>
        <form id='editForm' className={styles['users__form']} onSubmit={handleEditModalOk}>
          <div>
            <Typography> ID: {currentID} </Typography>
          </div>
          <div>
            <Typography> Old Avatar: </Typography>
          </div>
          <img src={currUser.avatar} />
          <div>
            <Typography> New Avatar: </Typography>
          </div>
          <div> 
            {UploadProp()} 
          </div>
          <div>
            <Typography> Email: </Typography>
            <input id="edit_email" name="email" type="email" defaultValue={currUser.email} required minLength={2} maxLength={62} />
          </div>
          <div>
            <Typography> First Name: </Typography>
            <input id="edit_first_name" name="first_name" type="text" defaultValue={currUser.first_name} required minLength={2} maxLength={50} />
          </div>
          <div>
            <Typography> Last Name: </Typography>
            <input id="edit_last_name" name="last_name" type="text" defaultValue={currUser.last_name} required minLength={2} maxLength={50} />
          </div>
        </form>
      </>
    );
  }

  // Delete Modal
  const handleDeleteModalOk = async () => {
    const currentID = window.location.pathname.split('/')[3];

    const res = await deleteUser(currentID);

    if(res === 204) {
      customMessage('success', 'User is deleted on the database');
      navigate('/users');
    } else {
      customMessage('error', `An error occured: ${res}`);
      navigate('/users');
    }
  }

  function ModalDeleteContent() {
    return(
      <div>
        <Typography>
          Are you sure you want to delete this user?
        </Typography>
      </div>
    )
  }

  // General Functions and Props
  const handleCancel = () => {
    navigate('/users');
  };

  // Image Upload 
  function UploadProp() {
    return(
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        className="avatar-uploader"
        key='uploadProp'
        listType="picture-card"
        name="avatar"
        showUploadList={false}
        onChange={handleImageChange}
      >
        {imageUrl ? (
          <img
            alt="avatar"
            src={imageUrl}
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }

  // Modal General Content
  function ModalSwitchContent() {
    switch(modalType) {
      case 'create':
        return ModalNewContent()
      case 'edit':
        return ModalEditContent()
      case 'delete':
        return ModalDeleteContent()
    }
  }

  function confirmLoading() {
    switch(modalType) {
      case 'create':
        return isCreating;
      case 'edit':
        return isUpdating;
      case 'delete':
        return isDeleting;
    }
  }
  // Functions -- END

  // Main Function
  return(
    <CustomModal
      modalContent={ModalSwitchContent()}
      confirmLoading={confirmLoading()}
      confirmText={confirmText}
      handleCancel={handleCancel}
      handleDelete={handleDeleteModalOk}
      modalType={modalType}
      open={true}
      titleText={titleText}
    />
  )
}