import './Exhibit.css';
import statue from "../../Assets/statue.png"

const Exhibit = (props) => {
  return(
    <div 
      className="exhibit"
      ref={props.exhibitRef}
      style={{
        left: `${props.exhibit.x}%`,
        top: `${props.exhibit.y}%`,
        width: `${props.exhibitSize}%`,
        paddingBottom: `${props.exhibitSize}%`
      }}>
        <img src={statue} 
          alt="Image" width="100%" className="exhibit-statue"
          style={{
            transform: `rotate(${props.exhibit.rot}deg)`
          }}/>
    </div>)
}

export default Exhibit;