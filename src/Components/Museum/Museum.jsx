import './Museum.css';
import Player from '../Player/Player';
import Exhibit from '../Exhibit/Exhibit';

const Museum = (props) => {

  return(
    <div 
      className="museum" 
      ref={props.museumRef}>
      {props.exhibits.map((exhibit, index) => (
        <Exhibit 
          exhibitRef={(ref) => (props.exhibitRefs.current[index] = ref)} key={index} exhibit={exhibit}
          exhibitSize={props.exhibitSize}        />
      ))}
      
      <Player
        playerRef={props.playerRef}
        playerPosition={props.playerPosition}
        playerSize={props.playerSize}
      />
    </div>)
}

export default Museum;