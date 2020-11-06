import React, { useState } from "react"
import style from "./NavigationDot.css"

export const Carousel = (props) => {
    let [mainIndex, setMainindex] = useState(0)
    let [end, setEnd] = useState({ prev: true, next: false })

    let dot = props.slideData.map((e, i) => {
        return <div className={`${style.dot} ${i == mainIndex ? style.selectDot : ""}`} key={i} onClick={() => dotClickHandler(i, props.slideDataLength)}></div>
    })

    const dotClickHandler = (index, length) => {
        if (!props.infiniti) {
            if (index == 0) {
                setEnd({ ...end, prev: true, next: false })
            } else if (index == length - 1) {
                setEnd({ ...end, prev: false, next: true })
            } else {
                setEnd({ ...end, prev: false, next: false })
            }
        }
        props.setMainindex(index)
    }

    return (
        <>
            <div className={style.dotNavigation}>
                {dot}
            </div>
        </>
    )
}