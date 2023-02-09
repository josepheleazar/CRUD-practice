import React from "react";

import { Button, Modal } from 'antd';

import styles from './styles.module.scss';

export default function CustomModal(props) {
  const {
    confirmLoading,
    confirmText,
    handleCancel,
    handleDelete,
    modalContent,
    modalType,
    open,
    titleText,
  } = props;

  return(
    <Modal
      title={titleText}
      open={open}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <div key='modalFooterContent'>
          <Button key='modalCancelBtn' onClick={() => handleCancel()} className={styles['secondary-button']}>
            Cancel
          </Button>
          {
            confirmLoading ? (
              <Button key='modalLoadingBtn' htmlType='submit' type='primary' className={styles['primary-button']} disabled loading>
                Loading
              </Button>
            ) : (
              modalType === 'create' ? (
                <Button key='modalAddBtn' form='newForm' htmlType='submit' type='primary' className={styles['primary-button']}>
                  {confirmText}
                </Button>
              ) : modalType === 'edit' ? (
                <Button key='modalSaveBtn' form='editForm' htmlType='submit' type='primary' className={styles['primary-button']}>
                  {confirmText}
                </Button>
              ) : (
                <Button key='modalYesBtn' onClick={() => handleDelete()} type='primary' className={styles['primary-button']}>
                  {confirmText}
                </Button>
              )
            )
          }
        </div>
      ]}
    >
      {modalContent}
    </Modal>
  );
}