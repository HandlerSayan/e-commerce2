import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../AppContext/StoreContext'
import { useParams } from 'react-router-dom'
import { Crum } from '../AppComponents/Crum/Crum'
import all_product from '../AppComponents/Images/all_product'
import { ProductDisplay } from '../AppComponents/ProductDisplay/ProductDisplay'
import { Box } from '../AppComponents/Box/Box'
import { RelatedProducts } from '../AppComponents/RelatedProducts/RelatedProducts'

export const Products = () => {
  const {all_product} = useContext(StoreContext)
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId))
  return (
    <div>
      <Crum product={product}/>
      <ProductDisplay product={product}/>
      <Box/>
      <RelatedProducts/>
    </div>
  )
}
