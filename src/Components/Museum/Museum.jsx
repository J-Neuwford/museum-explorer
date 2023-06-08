import React, { useRef, useEffect} from 'react';
import './Museum.css';
import Player from '../Player/Player';

const Museum = () => {
  const museumRef = useRef(null);

  useEffect(() => {
    const m = museumRef.current
    const {x, y, width, height} = m.getBoundingClientRect();

    console.log('x: ', x)
    console.log('y: ', y)
    console.log('width: ', width)
    console.log('height', height)


  }, [])

  return(
    <div ref={museumRef} className="museum">
    Museum
      <Player/>
    </div>)
}

export default Museum;