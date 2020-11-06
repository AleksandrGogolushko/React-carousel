import React, {  useRef, useState } from "react"
import style from "./Carousel.css"

export const Carousel = (props) => {
    let [mainIndex, setMainindex] = useState(0)
    let [end, setEnd] = useState({ prev: true, next: false })
    let [startPosition, setStartPosition] = useState(0)
    let [trackPosition, setTrackPosition] = useState(0)
    const slideTrack = useRef()

    const setPositon = (event, position, transition) => {
        slideTrack.current.style.transition = transition;
        slideTrack.current.style.transform = position
    }

    const StartHandler = (event) => {
        setStartPosition(event.touches[0].pageX)
    }

    const moveHandler = (event) => {
        let moveX = event.touches[0].pageX
        let position = `translateX(${(moveX - startPosition) - trackPosition}px)`;
        setPositon(event, position, "none")
    }

    const endHandler = (event) => {
        let endX = event.changedTouches[0].pageX;
        let dif = Math.abs(startPosition - endX);
        let position = `translateX(-${trackPosition}px`;
        setPositon(event, position, "")
        if (startPosition < endX && dif > 70) {
            if (mainIndex == 0 && !props.infiniti) {
                return
            }
            prevSlide()
        } else if (startPosition > endX && dif > 70) {
            if (mainIndex == props.slideData.length - 1 && !props.infiniti) {
                return
            }
            nextSlide()
        } else {
            return
        }

    }


    let slide =  props.slideData.map((e, i) => {
        return <div key={i} className={`${style.slide} `}>{e}</div>
    })

    let dot = props.slideData.map((e, i) => {
        return <div className={`${style.dot}  ${i == mainIndex ? style.selectDot : ""} `} key={i} onClick={(ev) => dotClickHandler(i, props.slideData.length)}></div>
    })


    const dotClickHandler = (index, length, event) => {
        if (index == 0) {
            setEnd({ ...end, prev: true, next: false })
        } else if (index == length - 1) {
            setEnd({ ...end, prev: false, next: true })
        } else {
            setEnd({ ...end, prev: false, next: false })
        }
        setMainindex(index)
        let positionToMove = (slideTrack.current.offsetWidth * (100 / slide.length * index)) / 100
        setTrackPosition(positionToMove)
        slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
    }


    const nextSlide = () => {
        if (!props.infiniti){
        if (mainIndex < slide.length - 1) {
            setMainindex(++mainIndex)
            let positionToMove = (slideTrack.current.offsetWidth * (100 / slide.length * mainIndex)) / 100
            setTrackPosition(positionToMove)
            slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
            setEnd({ ...end, prev: false })
        }
        if (mainIndex == slide.length - 1) {
            setEnd({ ...end, next: true })
        }
    }else{
        setMainindex(++mainIndex)
            let positionToMove = (slideTrack.current.offsetWidth * (100 / slide.length * mainIndex)) / 100
            setTrackPosition(positionToMove)
            slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
            console.log(mainIndex)
        if(mainIndex > slide.length - 1){
                slideTrack.current.style.transform = `translateX(0px)`
               setMainindex(0)
        }
     } 
    }

    const prevSlide = () => {
        if (!props.infiniti){
            if (mainIndex > 0) {
                setMainindex(--mainIndex)
                let positionToMove = (slideTrack.current.offsetWidth * (100 / slide.length * mainIndex)) / 100
                setTrackPosition(positionToMove)
                slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
                setEnd({ ...end, next: false })
            }
            if (mainIndex == 0) {
                setEnd({ ...end, prev: true })
            }
        }else{
            setMainindex(--mainIndex)
            let positionToMove = (slideTrack.current.offsetWidth * (100 / slide.length * mainIndex)) / 100
            setTrackPosition(positionToMove)
            slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
            console.log(mainIndex)
           if(mainIndex <  0){
            slideTrack.current.style.transform = `translateX(-${(slideTrack.current.offsetWidth * (100 / slide.length * (slide.length-1))) / 100}px)`
            setMainindex(slide.length-1)
        }
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.slideWrapper} >
                <div ref={slideTrack}
                    onTouchStart={(event) => StartHandler(event)}
                    onTouchMove={(event) => moveHandler(event)}
                    onTouchEnd={(event) => endHandler(event)}
                    style={{ width: `${100 * slide.length}%`}} className={style.slideTrack}>
                    {slide}
                </div>
            </div>
            <div className={style.dotNavigation}>
                {dot}
            </div>
            {
                props.infiniti ? <div className={`${style.prevButton} ${style.button} `} onClick={prevSlide}></div> :
                    <div className={`${style.prevButton} ${style.button} ${end.prev ? style.disabled : ""}`} onClick={end.prev ? null : prevSlide}></div>
            }
            {
                props.infiniti ? <div className={`${style.nextButton} ${style.button}`} onClick={nextSlide}></div> :
                    <div className={`${style.nextButton} ${style.button} ${end.next ? style.disabled : ""}`} onClick={end.next ? null : nextSlide}></div>
            }
        </div>
    )
}