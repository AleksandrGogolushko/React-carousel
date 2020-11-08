import React, { useRef, useState } from "react";
import style from "./Carousel.css";
import { NavigationButtons } from "./NavigationButtons/NavigationButtons.jsx";
import { NavigationDot } from "./NavigationDot/NavigationDot.jsx";

export const Carousel = (props) => {
  const slideTrack = useRef();
  let [mainIndex, setMainIndex] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const [end, setEnd] = useState({ prev: true, next: false });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const slides = props.slides.map((e, i) => (
    <div key={i} className={`${style.slide} `}>
      {e}
    </div>
  ));

  const nextSlide = () => {
    if (!props.infinity) {
      if (mainIndex < slides.length - props.slidesOnScreen) {
        moveTo(++mainIndex);
        setEnd({ ...end, prev: false });
      }
      if (mainIndex == slides.length - props.slidesOnScreen) {
        setEnd({ ...end, next: true });
      }
    } else {
      moveTo(++mainIndex);
      if (mainIndex > slides.length - props.slidesOnScreen) {
        slideTrack.current.style.transform = `translateX(0px)`;
        setTrackPosition(0);
        setMainIndex(0);
      }
    }
  };

  const prevSlide = () => {
    if (!props.infinity) {
      if (mainIndex > 0) {
        moveTo(--mainIndex);
        setEnd({ ...end, next: false });
      }
      if (mainIndex == 0) {
        setEnd({ ...end, prev: true });
      }
    } else {
      moveTo(--mainIndex);
      if (mainIndex < 0) {
        let positionToMove = getPositionToMove(slides.length - props.slidesOnScreen);
        slideTrack.current.style.transform = `translateX(-${positionToMove}px)`;
        setMainIndex(slides.length - props.slidesOnScreen);
        setTrackPosition(positionToMove);
      }
    }
  };

  const moveTo = (mainIndex) => {
    setMainIndex(mainIndex);
    let positionToMove = getPositionToMove(mainIndex);
    setTrackPosition(positionToMove);
    slideTrack.current.style.transform = `translateX(-${positionToMove}px)`;
  };

  const getPositionToMove = (slideIndex) => {
    return (slideTrack.current.offsetWidth * ((100 / slides.length) * slideIndex)) / 100;
  };

  const startHandler = (event) => {
    if (event.touches) {
      setStartPosition(event.touches[0].pageX);
    } else {
      setStartPosition(event.pageX);
      setIsMouseDown(true);
      if (event.target.nodeName === "IMG") {
        event.target.draggable = false;
      }
    }
  };

  const moveHandler = (event) => {
    let moveX;
    if (event.touches) {
      moveX = event.touches[0].pageX;
      setPositionAfterMove(moveX);
    } else if (isMouseDown) {
            moveX = event.pageX;
            setPositionAfterMove(moveX);
    }
  };

  const setPositionAfterMove = (moveX) => {
    let position = `translateX(${moveX - startPosition - trackPosition}px)`;
    setPositon(position, "none");
  };

  const endHandler = (event) => {
    let endX;
    if (event.touches) {
      endX = event.changedTouches[0].pageX;
    } else {
      endX = event.pageX;
      setIsMouseDown(false);
    }
    let dif = Math.abs(startPosition - endX);
    let position = `translateX(-${trackPosition}px)`;
    setPositon(position, "");

    if (dif <= 70) {
      return;
    } else if (startPosition < endX) {
      if (mainIndex == 0 && !props.infinity) {
        return;
      }
      prevSlide();
    } else if (startPosition > endX) {
      if (mainIndex == props.slides.length - 1 && !props.infinity) {
        return;
      }
      nextSlide();
    }
  };

  const setPositon = (position, transition) => {
    slideTrack.current.style.transform = position;
    slideTrack.current.style.transition = transition;
  };

  return (
    <div className={style.wrapper}>
      <div className={style.slideWrapper}>
        <div
          ref={slideTrack}
          onTouchStart={(event) => startHandler(event)}
          onTouchMove={(event) => moveHandler(event)}
          onTouchEnd={(event) => endHandler(event)}
          onMouseDown={(event) => startHandler(event)}
          onMouseMove={(event) => moveHandler(event)}
          onMouseUp={(event) => endHandler(event)}
          onMouseLeave={(event)=>endHandler(event)}
          style={{
            width: `${(100 * slides.length) / props.slidesOnScreen}%`,
          }}
          className={style.slideTrack}
        >
          {slides}
        </div>
      </div>
      <NavigationDot
        slidesLength={slides.length}
        slidesOnScreen={props.slidesOnScreen}
        mainIndex={mainIndex}
        setMainindex={setMainIndex}
        setEnd={setEnd}
        slideTrack={slideTrack}
        setTrackPosition={setTrackPosition}
        infinity={props.infinity}
      />
      <NavigationButtons infinity={props.infinity} end={end} prevSlide={prevSlide} nextSlide={nextSlide} />
    </div>
  );
};
