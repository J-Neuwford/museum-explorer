import React, { useState, useEffect, useRef } from 'react';
import './Player.css';

const Player = (props) => {
  const [playerPosition, setPlayerPosition] = useState({x: 46, y: 85})
  const [pressedKeys, setPressedKeys] = useState([]);
  const [northCollision, setNorthCollision] = useState(false);
  const [eastCollision, setEastCollision] = useState(false);
  const [southCollision, setSouthCollision] = useState(false);
  const [westCollision, setWestCollision] = useState(false);
  const playerSize = 1 * props.globalScale;

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    if (!pressedKeys.includes(key)) {
      setPressedKeys((prevKeys) => [...prevKeys, key]);
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key.toLowerCase();
    setPressedKeys((prevKeys) => prevKeys.filter((k) => k !== key));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId = null;
    let x = playerPosition.x;
    let y = playerPosition.y;

    const movePlayer = () => {
      if (pressedKeys.includes('w') ) {
        y -= 1;
      }
      if (pressedKeys.includes('a') && !westCollision) {
        x -= 0.5;
      }
      if (pressedKeys.includes('s') && !southCollision) {
        y += 1;
      }
      if (pressedKeys.includes('d') && !eastCollision) {
        x += 0.5;
      }

      // ==== MUSEUM BOUNDARIES ====

      const m = props.museumRef.current;
      const {x: mXPos, y: mYPos, width: mWidth, height: mHeight, top: mTop} = m.getBoundingClientRect();

      const p = props.playerRef.current;
      let {x: pXPos, y: pYPos, width: pWidth, height: pHeight} = p.getBoundingClientRect();

      // props.setMuseumPosition({x: mXPos, y: mYPos})
      x = Math.min(Math.max(x, 0), 100 - playerSize)
      y = Math.min(Math.max(y, 0), 100 - playerSize * 2)

      console.log("x", x)
      console.log("y", y)

      console.log("pixel width: ", mWidth * 0.07)
      console.log("player size: ", pWidth)
 
      // ==== MUSEUM BOUNDARIES END ====

      setPlayerPosition({ x: x, y: y });
      animationFrameId = requestAnimationFrame(movePlayer);
    };
    if (pressedKeys.length > 0) {
      animationFrameId = requestAnimationFrame(movePlayer);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pressedKeys]);

  return (
    <div
      className="player"
      ref={props.playerRef}
      style={{
        width: `${playerSize}%`,
        paddingBottom: `${playerSize}%`,
        top: `${playerPosition.y}%`,
        left: `${playerPosition.x}%`
      }}
    >
      Player
    </div>
  );
};

export default Player;


      // const m = props.museumRef.current;
      // const {x: mXPos, y: mYPos, width: mWidth, height: mHeight, top: mTop} = m.getBoundingClientRect();

      // const p = props.playerRef.current;
      // let {x: pXPos, y: pYPos, width: pWidth, height: pHeight} = p.getBoundingClientRect();

      // props.setMuseumPosition({x: mXPos, y: mYPos})

      // if(pXPos <= mXPos){ 
      //   setWestCollision(true)
      //   console.log("WEST WALL COLLISION!")
      // } else if (pYPos <= mYPos) {
      //   setNorthCollision(true)
      //   console.log("NORTH WALL COLLISION!")
      // } else if ( pXPos + pWidth >= mXPos + mWidth) {
      //   console.log("EAST WALL COLLISION!")
      // } else if ( pYPos + pHeight >= mYPos + mHeight) {
      //   console.log("SOUTH WALL COLLISION!")
      // } else {
      //     setNorthCollision(false)
      //     setEastCollision(false)
      //     setSouthCollision(false)
      //     setWestCollision(false)
      //   }