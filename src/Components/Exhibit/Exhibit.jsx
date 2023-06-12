import './Exhibit.css';

const Exhibit = (props) => {
  return(
    <div 
      className="exhibit"
      ref={props.exhibitRef}
      style={{
        left: `${props.exhibit.x}%`,
        top: `${props.exhibit.y}%`,
        width: `${props.exhibit.size}%`,
        paddingBottom: `${props.exhibit.size}%`
      }}>
    </div>)
}

export default Exhibit;