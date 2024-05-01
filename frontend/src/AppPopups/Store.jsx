import React from 'react'
import { Super } from '../AppComponents/Super/Super'
import { Famous } from '../AppComponents/Famous/Famous'
import { Offer } from '../AppComponents/Offer/Offer'
import { Collections } from '../AppComponents/Collections/Collections'
import NewsLetter from '../AppComponents/NewsLetter/NewsLetter'

export const Store = () => {
  return (
    <div>
      <Super/>
      <Famous/>
      <Offer/>
      <Collections/>
      <NewsLetter/>
    </div>
  )
}
