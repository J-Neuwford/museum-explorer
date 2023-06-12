import React, { useRef, useState, useEffect} from 'react';
import './Museum.css';
import Player from '../Player/Player';
import Exhibit from '../Exhibit/Exhibit';

const Museum = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 46, y: 85})
  const [pressedKeys, setPressedKeys] = useState([]);
  const playerRef = useRef(null);
  const exhibitRef = useRef(null);

  const exhibits = [
    {x: 45, y: 40, size: 10}
  ]


  return(
    <div className="museum">
      {exhibits.map((exhibit, index) => (
        <Exhibit exhibitRef={exhibitRef} key={index} exhibit={exhibit}/>
      ))}
      
      <Player
        playerRef={playerRef}
        exhibitRef={exhibitRef}
        playerPosition={playerPosition}
        setPlayerPosition={setPlayerPosition}
        pressedKeys={pressedKeys}
        setPressedKeys={setPressedKeys}
      />
    </div>)
}

export default Museum;