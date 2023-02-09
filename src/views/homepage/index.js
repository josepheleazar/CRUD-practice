import React from "react";

import { Container } from 'reactstrap';

import styles from './homepage.module.scss';

export default function Homepage() {
  return(
    <Container fluid className={styles['homepage__container']}>
      <div className={styles['homepage__main__container']}>
        <h1> Homepage </h1>
        <h2> Joseph Eleazar B. Arias </h2>
      </div>
    </Container>
  );
}