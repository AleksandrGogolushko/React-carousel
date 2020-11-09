import React, { useState } from "react";
import style from "./NavigationDot.css";

export const NavigationDot = React.memo((props) => {
  let dots = [];
  for (let i = 0; i < props.slidesLength-props.slidesOnScreen+1; i++) {
    dots.push(
      <div
        className={`${style.dot} 
        ${i == props.mainIndex ? style.selectDot : ""} `}
        key={i}
        onClick={() => dotClickHandler(i, props.slidesLength)}
      ></div>
    );
  }

  const dotClickHandler = (index, length) => {
    console.log(length)
      if(!props.infinity){
        if (index == 0) {
            props.setEnd({ prev: true, next: false });
          } else if (index == dots.length - 1) {
            props.setEnd({ prev: false, next: true });
          } else {
            props.setEnd({ prev: false, next: false });
          }
      }
    props.setMainindex(index);
    let positionToMove = (props.slideTrack.current.offsetWidth * ((100 / length) * index)) / 100;
    props.setTrackPosition(positionToMove);
    props.slideTrack.current.style.transform = `translateX(-${positionToMove}px)`;
  };

  return (
    <>
      <div className={style.dotNavigation}>{dots}</div>
    </>
  );
});
