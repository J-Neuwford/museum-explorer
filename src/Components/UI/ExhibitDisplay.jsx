import React, { useEffect, useState } from 'react'
import './ExhibitDisplay.css'
import axios from 'axios'

const ExhibitDisplay = ({ exhibitId }) => {
  const [exhibitTitle, setExhibitTitle] = useState(null)
  const [exhibitImage, setExhibitImage] = useState(null)
  const [exhibitDescription, setExhibitDescription] = useState(null)

  useEffect(() => {
    const getExhibit = async () => {
      const url = 'https://api.vam.ac.uk/v2/museumobject/O828146'
      const imageUrl = "https://framemark.vam.ac.uk/collections/"
      const imageSize = 120;

      try {
        const response = await axios.get(url);
        const exhibitData = await response.data.record;

        setExhibitTitle(exhibitData.titles[0].title)
        setExhibitImage(`${imageUrl}${exhibitData.images[0]}/full/!${imageSize},${imageSize}/0/default.jpg`)
        setExhibitDescription(exhibitData.summaryDescription)
        //console.log(exhibitData.summaryDescription)
      } catch (error) {
        console.error('error fetching exhibit', error);
      }
    }

    getExhibit();

  }, [exhibitId])

  return (
    <div className="exhibit-display">
     <div>{exhibitTitle}</div>
     <img src={exhibitImage}/>
     <div>{exhibitDescription}</div>
    </div>
  )
}

export default ExhibitDisplay;