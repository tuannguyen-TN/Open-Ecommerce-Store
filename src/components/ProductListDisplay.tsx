import { Grid } from '@mui/material'

import { Product } from '../types/Product'
import SingleListItemDisplay from './SingleListItemDisplay'

interface Props {
  products: Product[]
}

const ProductListDisplay = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((item: Product) => (
        <SingleListItemDisplay
          containQuantity={false}
          item={item}
          key={item.id}
        />
      ))}
    </Grid>
  )
}

export default ProductListDisplay
