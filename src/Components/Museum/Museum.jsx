import React, { useRef, useState} from 'react';
import './Museum.css';
import Player from '../Player/Player';
import Exhibit from '../Exhibit/Exhibit';

const Museum = () => {
  const[museumPosition, setMuseumPosition] = useState({x: null, y: null})
  const museumRef = useRef(null);
  const playerRef = useRef(null);
  const [globalScale] = useState(7);

  return(
    <div ref={museumRef} className="museum">
    Museum
      <Exhibit/>
      <Player
        museumRef={museumRef}
        playerRef={playerRef}
        museumPosition={museumPosition}
        setMuseumPosition={setMuseumPosition}
        globalScale={globalScale}
      />
    </div>)
}

export default Museum;