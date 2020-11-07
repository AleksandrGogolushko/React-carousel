import React, { useRef, useState } from "react"
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

        if (dif <= 70) {
            return
        } else if (startPosition < endX) {
            if (mainIndex == 0 && !props.infinity) {
                return
            }
            prevSlide()
        } else if (startPosition > endX) {
            if (mainIndex == props.slides.length - 1 && !props.infinity) {
                return
            }
            nextSlide()
        }
    }
 

    let slides = props.slides.map((e, i) => {
        return <div key={i} className={`${style.slide} `}>{e}</div>
    })

    let dots = props.slides.map((e, i) => {
        if (i <= props.slides.length - props.slidesOnScreen) {
            return <div className={`${style.dot}  ${i == mainIndex ? style.selectDot : ""} `} key={i} onClick={(ev) => dotClickHandler(i, props.slides.length)}></div>
        }
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
        let positionToMove = (slideTrack.current.offsetWidth * (100 / slides.length * index)) / 100
        setTrackPosition(positionToMove)
        slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
    }


    const nextSlide = () => {
        if (!props.infinity) {
            if (mainIndex < slides.length - props.slidesOnScreen) {
                setMainindex(++mainIndex)
                let positionToMove = (slideTrack.current.offsetWidth * (100 / slides.length * mainIndex)) / 100
                setTrackPosition(positionToMove)
                slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
                setEnd({ ...end, prev: false })
            }
            if (mainIndex == slides.length - props.slidesOnScreen) {
                setEnd({ ...end, next: true })
            }
        } else {
            setMainindex(++mainIndex)
            let positionToMove = (slideTrack.current.offsetWidth * (100 / slides.length * mainIndex)) / 100
            setTrackPosition(positionToMove)
            slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
            if (mainIndex > slides.length - props.slidesOnScreen) {
                slideTrack.current.style.transform = `translateX(0px)`
                setTrackPosition(0)
                setMainindex(0)
            }
        }
    }

    const prevSlide = () => {
        if (!props.infinity) {
            if (mainIndex > 0) {
                setMainindex(--mainIndex)
                let positionToMove = (slideTrack.current.offsetWidth * (100 / slides.length * mainIndex)) / 100
                setTrackPosition(positionToMove)
                slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
                setEnd({ ...end, next: false })
            }
            if (mainIndex == 0) {
                setEnd({ ...end, prev: true })
            }
        } else {
            setMainindex(--mainIndex)
            let positionToMove = (slideTrack.current.offsetWidth * (100 / slides.length * mainIndex)) / 100
            setTrackPosition(positionToMove)
            slideTrack.current.style.transform = `translateX(-${positionToMove}px)`
            if (mainIndex < 0) {
                slideTrack.current.style.transform = `translateX(-${(slideTrack.current.offsetWidth * (100 / slides.length * (slides.length - props.slidesOnScreen))) / 100}px)`
                setMainindex(slides.length - props.slidesOnScreen)
                setTrackPosition((slideTrack.current.offsetWidth * (100 / slides.length * (slides.length - props.slidesOnScreen))) / 100)
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
                    style={{ width: `${(100 * slides.length) / props.slidesOnScreen}%` }} className={style.slideTrack}>
                    {slides}
                </div>
            </div>
            <div className={style.dotNavigation}>
                {dots}
            </div>
            {
                props.infinity ? <div className={`${style.prevButton} ${style.button} `} onClick={prevSlide}></div> :
                    <div className={`${style.prevButton} ${style.button} ${end.prev ? style.disabled : ""}`} onClick={end.prev ? null : prevSlide}></div>
            }
            {
                props.infinity ? <div className={`${style.nextButton} ${style.button}`} onClick={nextSlide}></div> :
                    <div className={`${style.nextButton} ${style.button} ${end.next ? style.disabled : ""}`} onClick={end.next ? null : nextSlide}></div>
            }
        </div>
    )
}