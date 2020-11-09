import React, { useState } from "react";

import style from "./App.css";
import { Carousel } from "./Carousel/Carousel.jsx";

let data = [
  <button style={{padding:"1vw",marginLeft: "auto",  marginRight: "auto", display: "block",marginTop:" 40vh"}} onClick={() => alert("click")}>click</button>,
  <p  style={{padding:"5%"}}>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, dicta at nulla accusamus laboriosam obcaecati quis
    eum tempora impedit sapiente suscipit magni, vel, recusandae quod non eveniet quaerat corporis dolorem. Corrupti est
    error accusantium quibusdam beatae cumque quae nobis earum dolores harum repellendus, nisi ex voluptates consequatur
    modi placeat. Vero saepe amet excepturi accusamus neque quo maxime debitis laboriosam hic?
  </p>,
  <img src="https://w.wallhaven.cc/full/6k/wallhaven-6kpo7x.jpg" />,
  <div style={{padding:"5%"}}>
    <h1>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
    </h1>
    <p>Voluptatem, similique. Sit modi deserunt quas ea
      adipisci corporis labore impedit? Quaerat culpa totam id dolorum expedita explicabo quia possimus nulla quisquam.</p>
  </div>,
];

export const App = () => {
  let [infinity,setInfinity] = useState(false)
  let [slidesOnScreen,setSlidesOnScreen] = useState(1)
  return (
    <div className={style.wrapper}>
      <div className={style.settings}>
      <label htmlFor="infinity">Infinity</label>
        <input id="infinity" type="checkbox" name="infinity" onChange={(e)=>setInfinity(e.target.checked)}/>
        <label htmlFor="slidesOnScreen">Slides on screen</label>
        <input id="slidesOnScreen"  type="number" name="slidesOnScreen" value={slidesOnScreen} min={0} max={data.length} onChange={(e)=>setSlidesOnScreen(e.target.value)}/>
      </div>
      <Carousel slides={data} infinity={infinity} slidesOnScreen={slidesOnScreen}/>
    </div>
  );
};
