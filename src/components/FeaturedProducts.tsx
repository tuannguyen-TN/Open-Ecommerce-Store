import { Box, Typography } from '@mui/material'

import ProductListDisplay from './ProductListDisplay'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'

const FeaturedProducts = () => {
  const featuredProducts = useAppSelector(
    (state: StateType) => state.productsReducer
  ).featuredProducts

  return (
    <Box>
      <Typography variant="h4" align="center" color="text.primary" gutterBottom>
        Featured Products
      </Typography>
      <ProductListDisplay products={featuredProducts} />
    </Box>
  )
}

export default FeaturedProducts
