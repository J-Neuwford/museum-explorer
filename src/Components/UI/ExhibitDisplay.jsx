import React, { useEffect, useState } from 'react'
import './ExhibitDisplay.css'
import axios from 'axios'

const ExhibitDisplay = ({exhibits, viewedExhibit, exhibitRefs }) => {
  const [exhibitTitle, setExhibitTitle] = useState(null)
  const [exhibitImage, setExhibitImage] = useState(null)
  const [exhibitDescription, setExhibitDescription] = useState(null)

  useEffect(() => {
    const setExhibit = () => {
      const x = exhibits.find(
        (exhibit) =>
          viewedExhibit.style.left === `${exhibit.x}%` &&
          viewedExhibit.style.top === `${exhibit.y}%`
      );

      if (x) {
        return x.exhibitNo;
      }

      return null;
    };

    const getExhibit = async () => {
      const exhibitNo = setExhibit();
      const url = `https://api.vam.ac.uk/v2/museumobject/${exhibitNo}`
      const imageUrl = "https://framemark.vam.ac.uk/collections/"
      const imageSize = 500;

      try {
        const response = await axios.get(url);
        const exhibitData = await response.data.record;
        setExhibit();
        setExhibitTitle(exhibitData.titles[0].title)
        setExhibitImage(
          `${imageUrl}${exhibitData.images[0]}/full/!${imageSize},${imageSize}/0/default.jpg`
          )
        setExhibitDescription(exhibitData.summaryDescription)
        //console.log(exhibitData.summaryDescription)
      } catch (error) {
        console.error('error fetching exhibit', error);
      }
    }
    
    setExhibit();
    getExhibit();

  }, [exhibits, viewedExhibit, exhibitRefs])

  return (
    <div className="exhibit-display">
     <h1 className="exhibit-title">{exhibitTitle}</h1>
     <img className="exhibit-image" src={exhibitImage} alt={exhibitTitle}/>
     <div className="exhibit-description">{exhibitDescription}</div>
    </div>
  )
}
export default ExhibitDisplay;