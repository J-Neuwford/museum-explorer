# MUSEUM EXPLORER

A top down rpg style museum explorer using the V&A Collections API. The goal of this app is to further my understanding of React and CSS, and to gain more experience with third-party API integration.

## MVP 
 - User should be able to move a character and explore exhibits in a museum. - DONE
 - user should be able to view a title, image and description of the exhibit when they interact with it. - DONE


## Challenges
One of the key challenges I have faced so far is creating fluid player movement and collision mechanics, whilst also maintaining responsiveness to allow for different screen sizes. The steps I took to solve these problems were: 
 - I used element style values as a percentage to move the player position rather than pixel values.
 - I used refs to get pixel data to detect collision.
 - I combined collision and movement into the same useEffect block with min/max values for boundaries, as other methods seem to create stuttering movements or update the pldayer positoin too late, making the player appear to vibrate over the exhibits (not a good look).


## To do:
 - integrate the V&A collections API with the exhibits. - DONE
 - normalise the player movement speed to prevent faster diagonal movement
 - add sprites to implement the top down rpg style.
 - review and re-design how the exhibit information is displayed.
 - add loading message when waiting for API response.
