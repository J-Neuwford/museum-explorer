import './Exhibit.css';

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
    </div>)
}

export default Exhibit;