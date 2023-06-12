import React, { useRef, useState, useEffect } from 'react';
import Museum from '../Museum/Museum';
import Player from '../Player/Player';


const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 46, y: 85});
  const [pressedKeys, setPressedKeys] = useState([]);

  const playerRef = useRef(null);
  const museumRef = useRef(null);
  const exhibitRefs = useRef([]);

  const playerSize = 7;
  const moveSpeed = 2;
  const exhibitSize = 10;
  const exhibits = [
    {x: 45, y: 5},
    {x: 5, y: 5},
    {x: 85, y: 5},
    {x: 5, y: 75},
    {x: 85, y: 75}
  ]

  // ==== Player INPUT =====
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

  // ==== PLAYER MOVEMENT ====
  useEffect(() => {

    let animationFrameId = null;
    let x = playerPosition.x;
    let y = playerPosition.y;

    const movePlayer = () => {
      if (pressedKeys.includes('w') ) {
        y -= moveSpeed;
      }
      if (pressedKeys.includes('a')) {
        x -= moveSpeed / 2;
      }
      if (pressedKeys.includes('s')) {
        y += moveSpeed;
      }
      if (pressedKeys.includes('d')) {
        x += moveSpeed / 2;
      }

      // ==== COLLISION ====
      const p = playerRef.current;
      const m = museumRef.current;
      let {x: playerX, y: playerY, width: playerWidth} = p.getBoundingClientRect();
      let {x: museumX, y: museumY, width: museumWidth} = m.getBoundingClientRect();

      exhibitRefs.current.forEach((exhibitRef) => { 
      const e = exhibitRef;
      let {x: exhibitX, y: exhibitY, width: exhibitWidth} = e.getBoundingClientRect();

      // exhibitX as a percentage of museumWidth
      const eXPercent = ((exhibitX -  museumX) / (museumWidth) * 100 );

      // exhibitY as a percentage of museumWidth/2
      const eYPercent = ((exhibitY -  museumY) / (museumWidth / 2) * 100 );

      // playerX as a percentage of museumWidth
      // const pXPercent = ((playerX -  museumX) / (museumWidth) * 100 );

      if ( // player right-side
        playerY < exhibitY + exhibitWidth && 
        playerY + playerWidth > exhibitY &&  
        playerX < exhibitX
      ) {
        x = Math.min(Math.max(x, 0), eXPercent - playerSize)
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2)
        if( playerX + playerWidth + 4 >= exhibitX) {
          console.log("activate display")
        }
        
      } else if ( // player left-side
        playerY < exhibitY + exhibitWidth && 
        playerY + playerWidth > exhibitY &&
        playerX > exhibitX
      ) {
        x = Math.min(Math.max(x, eXPercent + exhibitSize), 100 - playerSize)
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2)
        if (playerX < exhibitX + exhibitWidth + 4) {
          console.log("activate display")
        }

      } else if ( // player bottom-side
        playerY  < exhibitY &&
        playerX + playerWidth > exhibitX &&
        playerX < exhibitX + exhibitWidth
      ){
        x = Math.min(Math.max(x, 0), 100 - playerSize)
        y = Math.min(Math.max(y, 0), eYPercent - playerSize * 2)
        if (playerY + playerWidth > exhibitY - 4) {
          console.log("activate display")
        }

      } else if ( // player top-side
        playerY  > exhibitY &&
        playerX + playerWidth > exhibitX &&
        playerX < exhibitX + exhibitWidth
      ){
        x = Math.min(Math.max(x, 0), 100 - playerSize)
        y = Math.min(Math.max(y, eYPercent + exhibitSize *2), 100 - playerSize * 2)
        if (playerY < exhibitY + exhibitWidth + 4) {
          console.log("activate display")
        }

      }
      else { // MUSEUM BOUNDARIES
        x = Math.min(Math.max(x, 0), 100 - playerSize)
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2)
      }
    })
      // ==== UPDATE PLAYER LOCATION ====
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

  return(
    <Museum
      museumRef={museumRef}
      exhibits={exhibits}
      exhibitRefs={exhibitRefs}
      exhibitSize={exhibitSize}
      playerRef={playerRef}
      playerPosition={playerPosition}
      playerSize={playerSize}
    />
    )
}

export default Game;