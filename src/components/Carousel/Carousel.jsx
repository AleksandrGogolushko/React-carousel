import React, { useRef, useState } from "react"
import style from "./Carousel.css"
import { Navigation } from "./NavigationButton/Navigation.jsx"

export const Carousel = (props) => {
    let [mainIndex, setMainindex] = useState(0)
    let [end, setEnd] = useState({ prev: true, next: false })
    let [startPosition, setStartPosition] = useState(0)
    const activeSlide = useRef()

    const setPositon = (event, position, transition) => {
        ///dont move in right if active first slide, and dont move in left if activ last slide
        // if (activeSlide.current.nextSibling == null && position.slice(11, -3) < 0) {
        //     return
        // }
        // if (activeSlide.current.previousSibling == null && position.slice(11, -3) > 0) {
        //     return    target.offsetParent.children
        // } 
        if (!props.infiniti) {
            activeSlide.current.style.transition = transition;
            activeSlide.current.nextSibling != null ? activeSlide.current.nextSibling.style.transition = transition : null;
            activeSlide.current.previousSibling != null ? activeSlide.current.previousSibling.style.transition = transition : null;

            activeSlide.current.style.transform = position
            activeSlide.current.nextSibling != null ? activeSlide.current.nextSibling.style.transform = position : null;
            activeSlide.current.previousSibling != null ? activeSlide.current.previousSibling.style.transform = position : null;
        } else {

            activeSlide.current.style.transition = transition;
            activeSlide.current.nextSibling != null ?
                  activeSlide.current.nextSibling.style.transition = transition :
                  activeSlide.current.parentNode.children[0].style.transition = transition;
            activeSlide.current.previousSibling != null ? 
                  activeSlide.current.previousSibling.style.transition = transition :
                  activeSlide.current.parentNode.children[slide.length - 1].style.transition = transition;

            activeSlide.current.style.transform = position
            activeSlide.current.nextSibling != null ? 
                   activeSlide.current.nextSibling.style.transform = position :
                   activeSlide.current.parentNode.children[0].style.transform = position;
            activeSlide.current.previousSibling != null ? 
                   activeSlide.current.previousSibling.style.transform = position :
                   activeSlide.current.parentNode.children[slide.length - 1].style.transform = position;
        }

    }

    const StartHandler = (event) => {
        setStartPosition(event.touches[0].pageX)
    }

    const moveHandler = (event) => {
        let moveX = event.touches[0].pageX
        let position = `translateX(${moveX - startPosition}px)`;
        setPositon(event, position, "none")
    }

    const endHandler = (event) => {
        let endX = event.changedTouches[0].pageX;
        let dif = Math.abs(startPosition - endX);
        let position = `translateX(0)`;6
        setPositon(event, position, "")
        if (startPosition < endX && dif > 60) {
            if (mainIndex == 0 && !props.infiniti) {
                return
            }
            prevSlide()
        } else if (startPosition > endX && dif > 60) {
            if (mainIndex == props.slideData.length - 1 && !props.infiniti) {
                return
            }
            nextSlide()
        } else {
            return
        }

    }

    /// not infiniti one slide on screen
    let slide = props.slideData.map((e, i) => {
        if (mainIndex == i) {
            return <div ref={activeSlide} 
             onTouchStart={(event) => StartHandler(event)}
             onTouchMove={(event) => moveHandler(event)} 
             onTouchEnd={(event) => endHandler(event)} 
             key={i} className={`${style.slide} ${style.slide_center} `}>{e}</div>
        }
        if (mainIndex < i) {
            return <div key={i} className={`${style.slide} ${style.slide_right} `}>{e}</div>
        }
        return <div key={i} className={`${style.slide} ${style.slide_left}`}>{e}</div>
    })





    //// infiniti one slider on screen
    let infinitiSlide = props.slideData.map((e, i) => {
       
        // if (mainIndex == i) {
        //     return <div
        //      ref={activeSlide} 
        //      onTouchStart={(event) => StartHandler(event)} 
        //      onTouchMove={(event) => moveHandler(event)} 
        //      onTouchEnd={(event) => endHandler(event)}
        //      key={i} className={`${style.slide} ${style.slide_center} `}>{e}</div>
        // }
        
        // if (mainIndex < i) {
        //     if (mainIndex == 0 && i == props.slideData.length - 1) {
        //      return <div key={i} className={`${style.slide} ${style.slide_left}`}>{e}</div>
        //     }
        //     return <div key={i} className={`${style.slide} ${style.slide_right} `}>{e}</div>
        // }
        // if (mainIndex > i) {
        //     if (mainIndex - 1 == i) {
        //         return <div key={i} className={`${style.slide} ${style.slide_left} `}>{e}</div>
        //     }
        //     return <div key={i} className={`${style.slide} ${style.slide_right}`}>{e}</div>
        // }

        // if (mainIndex == i) {
        //     return <div
        //      ref={activeSlide} 
        //      onTouchStart={(event) => StartHandler(event)} 
        //      onTouchMove={(event) => moveHandler(event)} 
        //      onTouchEnd={(event) => endHandler(event)}
        //      key={i} className={`${style.slide} ${style.slide_center} `}>{e}</div>
        // }
        
        // if (mainIndex + 1 == i) {
        //     return <div key={i} className={`${style.slide} ${style.slide_right} `}>{e}</div>
        // }
        // if (mainIndex - 1 == i ) {
        //         return <div key={i} className={`${style.slide} ${style.slide_left} `}>{e}</div>
        // }
        // if(i != mainIndex+1 || i!=mainIndex-1 || i!=mainIndex ){
        //     if(mainIndex == 0 && i == props.slideData.length - 1){
        //         return <div key={i} className={`${style.slide} ${style.slide_left} `}>{e}</div>
        //     }
        //     if(mainIndex == props.slideData.length - 1 ){
        //         if(i == 0){
        //             return <div key={i} className={`${style.slide} ${style.slide_right} `}>{e}</div>
        //         }else{
        //             return <div key={i} className={`${style.slide} ${style.slide_left} ${style.slide_Notransition} `}>{e}</div>
        //         }
        //     }
        //     return <div key={i} className={`${style.slide} ${style.slide_right} ${style.slide_Notransition} `}>{e}</div>
        // }


        if (mainIndex == i) {
            return <div ref={activeSlide} 
             onTouchStart={(event) => StartHandler(event)}
             onTouchMove={(event) => moveHandler(event)} 
             onTouchEnd={(event) => endHandler(event)} 
             key={i} className={`${style.slide} ${style.slide_center} `}>{e}</div>
        }
        if (mainIndex < i) {
            return <div  key={i} className={`${style.slide} ${style.slide_right} `}>{e}</div>
        }
        return <div  key={i} className={`${style.slide} ${style.slide_left}`}>{e}</div>
    })


    // let dot = props.slideData.map((e, i) => {
    //     return <div className={`${style.dot} ${i == mainIndex ? style.selectDot : ""}`} key={i} onClick={() => dotClickHandler(i, props.slideData.length)}></div>
    // })

    // const dotClickHandler = (index, length) => {
    //     if (!props.infiniti) {
    //         if (index == 0) {
    //             setEnd({ prev: true, next: false })
    //         } else if (index == length - 1) {
    //             setEnd({ prev: false, next: true })
    //         } else {
    //             setEnd({ prev: false, next: false })
    //         }
    //     }
    //     setMainindex(index)
    // }

    // const nextSlide = () => {
    //     let nextIndex = ++mainIndex;
    //     if (nextIndex > props.slideData.length - 1) {
    //         nextIndex = 0;
    //     } else if (nextIndex + 1 == props.slideData.length) {
    //         if (!props.infiniti) {
    //             setEnd({ prev: false, next: true })
    //         }
    //     } else {
    //         if (!props.infiniti) {
    //             setEnd({ prev: false, next: false })
    //         }
    //     }
    //     setMainindex(nextIndex)
    // }

    // const prevSlide = () => {
    //     let nextIndex = --mainIndex;
    //     if (nextIndex < 0) {
    //         nextIndex = props.slideData.length - 1;
    //     } else if (nextIndex - 1 < 0) {
    //         if (!props.infiniti) {
    //             setEnd({ prev: true, next: false })
    //         }
    //     } else {
    //         if (!props.infiniti) {
    //             setEnd({ prev: false, next: false })
    //         }
    //     }
    //     setMainindex(nextIndex)
    // }



    return (
        <div className={style.wrapper}>
            <div className={style.slideWrapper} >
                {!props.infiniti ? slide : infinitiSlide}
            </div>

              <Navigation mainIndex={mainIndex} slideDataLength={props.slideData.length} setMainIndex={setMainindex}/>

            {/* <div className={style.dotNavigation}>
                {dot}
            </div>
            {
                props.infiniti ? <div className={`${style.prevButton} ${style.button} `} onClick={prevSlide}></div> :
                    <div className={`${style.prevButton} ${style.button} ${end.prev ? style.disabled : ""}`} onClick={end.prev ? null : prevSlide}></div>
            }
            {
                props.infiniti ? <div className={`${style.nextButton} ${style.button}`} onClick={nextSlide}></div> :
                    <div className={`${style.nextButton} ${style.button} ${end.next ? style.disabled : ""}`} onClick={end.next ? null : nextSlide}></div>
            } */}
        </div>
    )
}