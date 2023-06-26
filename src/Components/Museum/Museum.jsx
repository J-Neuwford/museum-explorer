import './Museum.css';
import Player from '../Player/Player';
import Exhibit from '../Exhibit/Exhibit';
import museumFloor from "../../Assets/museumFloor.jpg"
import museumWalls from "../../Assets/museumWalls.jpg"

const Museum = (props) => {

  return(
    <div className="museum__walls">
      <img src={museumWalls} alt="Image" className='walls-image'/>
      <div 
        className="museum" 
        ref={props.museumRef}>
        <img src={museumFloor} alt="Image" className='museum-image'/>
        {props.exhibits.map((exhibit, index) => (
          <Exhibit 
            exhibitRef={(ref) => (props.exhibitRefs.current[index] = ref)} key={index} exhibit={exhibit}
            exhibitSize={props.exhibitSize}        
          />
        ))}
        
        <Player
          playerRef={props.playerRef}
          playerPosition={props.playerPosition}
          playerSize={props.playerSize}
        />
      </div>
    </div>
    )
}

export default Museum;