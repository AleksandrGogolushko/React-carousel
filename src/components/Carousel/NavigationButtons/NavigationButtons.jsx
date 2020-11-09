import React from "react";
import style from "./NavigationButtons.css";

export const NavigationButtons = React.memo((props) => {
  if (props.infinity) {
    return (
      <>
        <div className={`${style.prevButton} ${style.button}`} onClick={props.prevSlide}></div>
        <div className={`${style.nextButton} ${style.button}`} onClick={props.nextSlide}></div>
      </>
    );
  }
  return (
    <>
      <div
        className={`${style.prevButton} ${style.button} ${props.end.prev ? style.disabled : ""}`}
        onClick={props.end.prev ? null : props.prevSlide}
      ></div>
      <div
        className={`${style.nextButton} ${style.button} ${props.end.next ? style.disabled : ""}`}
        onClick={props.end.next ? null : props.nextSlide}
      ></div>
    </>
  );
});
