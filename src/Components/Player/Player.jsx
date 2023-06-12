import './Player.css';

const Player = (props) => {
  
  return (
    <div
      className="player"
      ref={props.playerRef}
      style={{
        width: `${props.playerSize}%`,
        paddingBottom: `${props.playerSize}%`,
        top: `${props.playerPosition.y}%`,
        left: `${props.playerPosition.x}%`
      }}>
    </div>
  );
};

export default Player;