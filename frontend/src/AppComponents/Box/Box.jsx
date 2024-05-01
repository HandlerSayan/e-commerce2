import React from 'react'
import './Box.css'

export const Box = () => {
  return (
    <div className="descriptionbox">
    <div className="descriptionbox-navigator">
      <div className="descriptionbox-nav-box">Description</div>
      <div className="descriptionbox-nav-box fade">Reviews (122)</div>
    </div>
    <div className="descriptionbox-description">
      <p>
      "Humor is a big part of my style. You have to be willing to fall on your face a bit, to be that fashion roadkill. I know so many people who are die-hard fashion people who are way more educated than I am, but I love fashion. It's so much more important than just material." —Zoë Kravitz
      </p>
      <p>
      "Fashion is part of the daily air and it changes all the time, with all the events. You can even see the approaching of a revolution in clothes. You can see and feel everything in clothes." —Diana Vreeland
      </p>
    </div>
  </div>
  )
}
