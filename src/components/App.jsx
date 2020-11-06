import React from "react"

import style from "./App.css"
import { Carousel } from "./Carousel/Carousel.jsx"


let data = [1,2,3,4,5]

 export const App = () =>{
    return (
        <div className={style.wrapper}>
           <Carousel slideData={data} infiniti={true}/>
        </div> 
    )
}