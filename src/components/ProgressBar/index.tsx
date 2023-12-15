import { FunctionComponent } from "react";
import classes from "./ProgressBar.module.scss";

const ProgressBar: FunctionComponent<{ progress: number }> = ({ progress }) => {
  const progressList = [1, 2, 3];
  return (
    <section className={classes.progressBar}>
      <div
        className={
          progress === 1
            ? classes.progressFirst
            : progress === 2
            ? classes.progressSecond
            : progress === 3
            ? classes.progressThird
            : ""
        }
      />
      {progressList.map((prog, index) => (
        <div
          className={`${classes.progressBar_progress} ${
            prog < progress
              ? classes.done
              : prog === progress
              ? classes.alt
              : ""
          }`}
          key={index}
        >
          <div className={classes.progressBar_progress__point} />
          <span className={classes.progressBar_progress__number}>{prog}</span>
        </div>
      ))}
    </section>
  );
};

export default ProgressBar;
