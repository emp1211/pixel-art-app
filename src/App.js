import './App.css';
import { handleMouseDown, updateBrush, handleMouseMove, handleMouseUp } from './events';
import { puzzles } from './puzzles';
import { rgbValueArrays, determineFontColor } from './palettes';
import React, { useEffect, useState } from 'react';

// Define app function
function App() {
  const [puzzleIndex, setPuzzleIndex ] = useState(0);
  let pixelArr = []; 
  let swatchArr = [];

  // Create function to update puzzle
  const renderNewPuzzle = (event) => {
    if (puzzleIndex === 3) {
        setPuzzleIndex(0)
    } else {
        setPuzzleIndex(puzzleIndex + 1)
    }
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
      pixel.style.backgroundColor = '';
    });
    let resetBrushColor = document.getElementById("brush");
    resetBrushColor.style.backgroundColor = '';
  };

  // Render legend for the canvas (256 pixel elements)
  for (let i = 0; i < 256; i++) {
    pixelArr.push(<div className="pixel" onMouseMove = { handleMouseMove } onMouseDown= { handleMouseDown} onMouseUp={ handleMouseUp }>{ puzzles[puzzleIndex].legend[i] }</div>);
  };

  // Populate legend for the palette (10 swatches)
  for (let i = 0; i < 10; i++) {
    let currId = "color" + i;
    swatchArr.push(<div className="swatch" id={ currId } onClick={ updateBrush }>{i}</div>);
  };

  // Store an array of dynamically determined palette swatch font colors (white or black)
  let swatchFontColorsArr = determineFontColor(rgbValueArrays[puzzles[puzzleIndex].paletteId]);
 
  // After page renders, load palette specified in puzzles array from palette array
  useEffect(() => {
    let paletteArr = document.querySelectorAll('.swatch');
    for (let i = 0; i < 10; i++) {
      paletteArr[i].style.backgroundColor = 'rgb(' + rgbValueArrays[puzzles[puzzleIndex].paletteId][i][0] +
                                            ', ' +  rgbValueArrays[puzzles[puzzleIndex].paletteId][i][1] +
                                            ', ' + rgbValueArrays[puzzles[puzzleIndex].paletteId][i][2] + ')';
      if (swatchFontColorsArr[i] === 0) {
        paletteArr[i].style.color = 'black';
      } else {
        paletteArr[i].style.color = 'white';
      }
    }
  });
 
  return (
    <div className="app" >
      <header>Pixel Art App</header>
      <div className="container">

        <div className="canvas-brush-container" >
          <div className="canvas">
            { pixelArr }
          </div>
          <div className="paintbrush-container" >
            <img src="paintbrush-solid.svg" alt='paintbrush' />
            <div id="brush" className="selected-color"></div>
          </div>
        </div>

          <div className="palette-container" >
            <img src="palette-solid.svg" alt='artists palette' />
            <div className="palette">
              { swatchArr }
            </div>
          </div>
      
          <div className="btn-container" >
            <button id="new-picture-btn" className="new-picture-btn" onClick={ renderNewPuzzle }>New Picture</button>
          </div>

      </div>
    </div>     
  );
}

export default App;