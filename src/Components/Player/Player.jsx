import React, { useState, useEffect, useRef } from 'react';
import './Player.css';

const Player = (props) => {
  const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0})
  const [pressedKeys, setPressedKeys] = useState([]);
  const moveSpeed = 5;

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
      if (pressedKeys.includes('w')) {
        y -= moveSpeed;
      }
      if (pressedKeys.includes('a')) {
        x -= moveSpeed;
      }
      if (pressedKeys.includes('s')) {
        y += moveSpeed;
      }
      if (pressedKeys.includes('d')) {
        x += moveSpeed;
      }

      // ==== COLLISION ====
      const m = props.museumRef.current;
      const {x: mXPos, y: mYPos, width: mWidth, height: mHeight} = m.getBoundingClientRect();

      const p = props.playerRef.current;
      const {x: pXPos, y: pYPos, width: pWidth, height: pHeight} = p.getBoundingClientRect();

      console.log("museum left wall: ", mXPos)
      console.log("player left side: ", pXPos)

      if(pXPos <= mXPos){ 
        console.log("WEST WALL COLLISION!")
      } else if (pYPos <= mYPos) {
        console.log("NORTH WALL COLLISION!")
      } else if ( pXPos + pWidth >= mXPos + mWidth) {
        console.log("EAST WALL COLLISION!")
      } else if ( pYPos + pHeight >= mYPos + mHeight) {
        console.log("SOUTH WALL COLLISION!")
      }
      // ==== COLLISION END ====
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
        transform: `translate(${playerPosition.x}px, ${playerPosition.y}px)`,
      }}
    >
      Player
    </div>
  );
};

export default Player;