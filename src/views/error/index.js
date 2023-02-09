import React from "react";

import { Container } from 'reactstrap';

import styles from './error.module.scss';

export default function Error() {
  return(
    <Container fluid className={styles['error__container']}>
      <div className={styles['error__main__container']}>
        <h1> Error 404 </h1>
      </div>
    </Container>
  );
}