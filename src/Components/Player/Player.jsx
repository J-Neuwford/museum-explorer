import React, { useState, useEffect, useRef } from 'react';
import './Player.css';

const Player = (props) => {
  
  const playerSize = 7;
  const moveSpeed = 2;

  // ==== Player INPUT =====
  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    if (!props.pressedKeys.includes(key)) {
      props.setPressedKeys((prevKeys) => [...prevKeys, key]);
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key.toLowerCase();
    props.setPressedKeys((prevKeys) => prevKeys.filter((k) => k !== key));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // ==== PLAYER MOVEMENT ====
  useEffect(() => {
    let animationFrameId = null;
    let x = props.playerPosition.x;
    let y = props.playerPosition.y;

    const movePlayer = () => {
      if (props.pressedKeys.includes('w') ) {
        y -= moveSpeed;
      }
      if (props.pressedKeys.includes('a')) {
        x -= moveSpeed / 2;
      }
      if (props.pressedKeys.includes('s')) {
        y += moveSpeed;
      }
      if (props.pressedKeys.includes('d')) {
        x += moveSpeed / 2;
      }

      // ==== COLLISION ====
      const p = props.playerRef.current;
      let {x: playerX, y: playerY, width: playerWidth} = p.getBoundingClientRect();

      const e = props.exhibitRef.current;
      let {x: exhibitX, y: exhibitY, width: exhibitWidth} = e.getBoundingClientRect();

      if( // player right-side
        playerY < exhibitY + exhibitWidth && 
        playerY + playerWidth > exhibitY &&  
        playerX < exhibitX
      ) {
        x = Math.min(Math.max(x, 0), 45 - playerSize)
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2)
      } else if ( // player left-side
        playerY < exhibitY + exhibitWidth && 
        playerY + playerWidth > exhibitY &&
        playerX > exhibitX
      ) {
        x = Math.min(Math.max(x, 55), 100 - playerSize)
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2)
      } else if ( // player top-side
        playerY  < exhibitY &&
        playerX + playerWidth > exhibitX &&
        playerX < exhibitX + exhibitWidth
      ){
        x = Math.min(Math.max(x, 0), 100 - playerSize)
        y = Math.min(Math.max(y, 0), 26)

      } else if ( // player bottom-side
        playerY  > exhibitY &&
        playerX + playerWidth > exhibitX &&
        playerX < exhibitX + exhibitWidth
      ){
        x = Math.min(Math.max(x, 0), 100 - playerSize)
        y = Math.min(Math.max(y, 60), 100 - playerSize * 2)
      }
      else { // MUSEUM BOUNDARIES
        x = Math.min(Math.max(x, 0), 100 - playerSize)
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2)
      }

      // ==== UPDATE PLAYER LOCATION ====
      props.setPlayerPosition({ x: x, y: y });
      animationFrameId = requestAnimationFrame(movePlayer);
    };
    if (props.pressedKeys.length > 0) {
      animationFrameId = requestAnimationFrame(movePlayer);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [props.pressedKeys]);

  return (
    <div
      className="player"
      ref={props.playerRef}
      style={{
        width: `${playerSize}%`,
        paddingBottom: `${playerSize}%`,
        top: `${props.playerPosition.y}%`,
        left: `${props.playerPosition.x}%`
      }}>
    </div>
  );
};

export default Player;