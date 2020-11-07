import React from "react"

import style from "./App.css"
import { Carousel } from "./Carousel/Carousel.jsx"


let data = [<button onClick={() => alert("click")}>click</button>, 2, 3, 4]

export const App = () => {
    return (
        <div className={style.wrapper}>
            <Carousel slides={data} infinity={true} slidesOnScreen={1} />
        </div>
    )
}