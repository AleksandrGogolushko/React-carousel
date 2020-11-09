# React-carousel

In this project, a react-carousel was implemented that works both on mobile and desktop devices, and can show any HTML content.
 ____________________________________________________________________________
 
## Main features:
 * Multiple slides on the screen;
 * Infinity option;
 * Scroling to selected slide;
 * Supports swipes (on mibile and desktop devices);
 ____________________________________________________________________________
 
 ## Demo 
 
 link: <https://aleksandrgogolushko.github.io/React-carousel/>.
  
 Demo version has settings on top of screen: "Infiniti", "Slides on screen". They respectively equal the `infinity`,`slidesOnScreen` options.
 If you change the `infinity` option, to correctly work, refresh the page.
  ____________________________________________________________________________
## Using
```js

let data = [ 
  <button>ok</button>, 
  <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas... </p>,
  <img src="https://w.wallhaven.cc/full/6k/wallhaven-6kpo7x.jpg" />,
  <div>
    <h1>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
    </h1>
    <p>Voluptatem, similique. Sit modi deserunt quas ea
      adipisci corporis labore impedit? Quaerat culpa totam id dolorum expedita explicabo quia possimus quisquam.</p>
  </div>,
];

export const App = () => {
    return (
        <div>
            <Carousel slides={data} infinity={false} slidesOnScreen={1} />
        </div>
    )
}
```
#### Options
* `slides` - an array with data that should be displayed in the react-carousel;
* `infinity` - when set to true, infinity mode is activated (after the last slide, the first will be displayed);
* `slidesOnScreen` - the number of displayed slides on the screen;

 ____________________________________________________________________________
 
 ## Setup local environment
  ```
 git clone https://github.com/AleksandrGogolushko/React-carousel.git
 cd React-carousel
 npm i 
 npm start
  ```
  Then open in browser http://localhost:8080/
  
