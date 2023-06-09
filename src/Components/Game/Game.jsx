import React, { useRef, useState, useEffect } from 'react';
import Museum from '../Museum/Museum';
import ExhibitDisplay from '../UI/ExhibitDisplay';
import grass from "../../Assets/grass.jpg";


const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 46, y: 85});
  const [pressedKeys, setPressedKeys] = useState([]);
  const [displayActive, setDisplayActive] = useState(false);
  const [viewedExhibit, setViewedExhibit] = useState(null);

  const playerRef = useRef(null);
  const museumRef = useRef(null);
  const exhibitRefs = useRef([]);

  const playerSize = 7;
  const moveSpeed = 2;
  const exhibitSize = 10;
  const exhibits = [
    {x: 45, y: 5, exhibitNo: 'O1427015', rot: 0},
    {x: 5, y: 5, exhibitNo: 'O86211', rot: -45},
    {x: 85, y: 5, exhibitNo: 'O71651', rot: 45},
    {x: 5, y: 75, exhibitNo: 'O69349', rot: -135},
    {x: 85, y: 75, exhibitNo: 'O1427018', rot: 135}
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

      if ( // player right-side
        playerY < exhibitY + exhibitWidth && 
        playerY + playerWidth > exhibitY &&  
        playerX < exhibitX
      ) {
        x = Math.min(Math.max(x, 0), eXPercent - playerSize);
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2);

      } else if ( // player left-side
        playerY < exhibitY + exhibitWidth && 
        playerY + playerWidth > exhibitY &&
        playerX > exhibitX
      ) {
        x = Math.min(Math.max(x, eXPercent + exhibitSize), 100 - playerSize);
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2);

      } else if ( // player bottom-side
        playerY  < exhibitY &&
        playerX + playerWidth > exhibitX &&
        playerX < exhibitX + exhibitWidth
      ){
        x = Math.min(Math.max(x, 0), 100 - playerSize);
        y = Math.min(Math.max(y, 0), eYPercent - playerSize * 2);

      } else if ( // player top-side
        playerY  > exhibitY &&
        playerX + playerWidth > exhibitX &&
        playerX < exhibitX + exhibitWidth
      ){
        x = Math.min(Math.max(x, 0), 100 - playerSize);
        y = Math.min(Math.max(y, eYPercent + exhibitSize *2), 100 - playerSize * 2);
      }
      else { // MUSEUM BOUNDARIES
        x = Math.min(Math.max(x, 0), 100 - playerSize);
        y = Math.min(Math.max(y, 0), 100 - playerSize * 2);
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


  // ==== DISPLAY EXHIBIT DETAILS ==== 
  useEffect(() => {
    const checkProximity = () => {
      let anyExhibitInRange = false;
      let exhibitInRange =  null;

      const p = playerRef.current;
      const { x: playerX, y: playerY} = p.getBoundingClientRect();

      exhibitRefs.current.some((exhibitRef) => {
        const e = exhibitRef;
        if (!e) return;
        const { x: exhibitX, y: exhibitY, width: exhibitWidth } = e.getBoundingClientRect();

        const distance = Math.sqrt(
          Math.pow(playerX - exhibitX, 2) + Math.pow(playerY - exhibitY, 2)
        );

        const proximityThreshold = 4 + playerSize + exhibitWidth;

        if (distance <= proximityThreshold) {
          anyExhibitInRange = true;
          exhibitInRange = e;
          return;
        }
      });

      setDisplayActive(anyExhibitInRange);
      setViewedExhibit(exhibitInRange)
    };

    const proximityCheckInterval = setInterval(checkProximity, 100);

    return () => {
      clearInterval(proximityCheckInterval);
    };
  }, [playerRef, exhibitRefs, setDisplayActive]);

  return(
    <div>
    <Museum
      museumRef={museumRef}
      exhibits={exhibits}
      exhibitRefs={exhibitRefs}
      exhibitSize={exhibitSize}
      playerRef={playerRef}S
      playerPosition={playerPosition}
      playerSize={playerSize}
    />
      <div
      >{displayActive ? 
        <ExhibitDisplay
          exhibits={exhibits}
          exhibitRefs={exhibitRefs}
          viewedExhibit={viewedExhibit}
        /> : null}</div>
      <img src={grass} alt="Image" 
          width="100%" height="100%" 
          className='grass-image'
          style={{transform: `translate(0%, -55%)`,
          position: `absolute`,
          zIndex: `-1`,
          filter: `brightness(0.15)`
          }}  />
    </div>
    )
}

export default Game;