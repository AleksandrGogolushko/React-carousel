import React from "react"

import style from "./App.css"
import { Carousel } from "./Carousel/Carousel.jsx"

 export const App = () =>{
    return (
        <div className={style.wrapper}>
           <Carousel/>
        </div> 
    )
}