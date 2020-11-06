import React, {useState } from "react"
import style from "./Navigation.css"

export const Navigation = (props) => {
    let [end, setEnd] = useState({ prev: true, next: false })
    console.log(props)
    const nextSlide = () => {
        let nextIndex = props.mainIndex + 1;
        if (nextIndex > props.slideDataLength - 1) {
            nextIndex = 0;
        } else if (nextIndex + 1 == props.slideDataLength) {
            if (!props.infiniti) {
                setEnd({ prev: false, next: true })
            }
        } else {
            if (!props.infiniti) {
                setEnd({ prev: false, next: false })
            }
        }
        props.setMainIndex(nextIndex)
    }

    const prevSlide = () => {
        let nextIndex = props.mainIndex - 1;
        if (nextIndex < 0) {
            nextIndex = props.slideDataLength - 1;
        } else if (nextIndex - 1 < 0) {
            if (!props.infiniti) {
                setEnd({ prev: true, next: false })
            }
        } else {
            if (!props.infiniti) {
                setEnd({ prev: false, next: false })
            }
        }
        props.setMainIndex(nextIndex)
    }

    
    let dot = Array(props.slideDataLength).fill(0).map((e, i) => {
        return <div className={`${style.dot} ${i == props.mainIndex ? style.selectDot : ""}`} key={i} onClick={() => dotClickHandler(i, props.slideDataLength)}></div>
    })

    const dotClickHandler = (index, length) => {
        if (!props.infiniti) {
            if (index == 0) {
                setEnd({ prev: true, next: false })
            } else if (index == length - 1) {
                setEnd({ prev: false, next: true })
            } else {
                setEnd({ prev: false, next: false })
            }
        }
        props.setMainIndex(index)
    }

    return (
        <>
            {
                props.infiniti ? <div className={`${style.prevButton} ${style.button} `} onClick={prevSlide}></div> :
                    <div className={`${style.prevButton} ${style.button} ${end.prev ? style.disabled : ""}`} onClick={end.prev ? null : prevSlide}></div>
            }
            {
                props.infiniti ? <div className={`${style.nextButton} ${style.button}`} onClick={nextSlide}></div> :
                    <div className={`${style.nextButton} ${style.button} ${end.next ? style.disabled : ""}`} onClick={end.next ? null : nextSlide}></div>
            }
             <div className={style.dotNavigation}>
                {dot}
            </div>
        </>
    )
}