"use client";
import { Suspense } from "react";
import { Progress } from "antd";
import Loader from '../loading'
import styles from "./homePage.module.scss";

const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const ProgressBar = () => {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <div className={styles.progressContainer}>
        <div className={styles.circleContainer}>
          <Progress type="circle" percent={98} />
          <p>Satisfied customers</p>
        </div>
        <div className={styles.circleContainer}>
          <Progress type="circle" percent={100} />
          <p>Safety!</p>
        </div>
        <div className={styles.circleContainer}>
          <Progress type="circle" strokeColor={twoColors} percent={100} format={() => "75000 +"}/>
          <p>Fulfilled orders</p>
        </div>
      </div>
    </Suspense>
  );
};

export default ProgressBar;
