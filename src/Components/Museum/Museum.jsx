import React, { useRef, useEffect} from 'react';
import './Museum.css';
import Player from '../Player/Player';
import Exhibit from '../Exhibit/Exhibit';

const Museum = () => {
  const museumRef = useRef(null);
  const playerRef = useRef(null);

  return(
    <div ref={museumRef} className="museum">
    Museum
      <Exhibit/>
      <Player
        museumRef={museumRef}
        playerRef={playerRef}
      />
    </div>)
}

export default Museum;