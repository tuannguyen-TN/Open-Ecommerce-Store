import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

import { Product } from '../types/Product'
import { useAppDispatch } from '../hooks/useAppDispatch'
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../redux/reducers/cartReducer'
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../redux/queries/productQueries'
import ProductMutationFormDialog from './ProductMutationFormDialog'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { CartItem } from '../types/CartItem'
import ImageCarousel from './ImageCarousel'
import {
  addFeaturedProduct,
  removeFeaturedProduct,
} from '../redux/reducers/productsReducer'
import { toast } from 'react-toastify'

interface Props {
  item: Product | CartItem
  containQuantity: boolean
}

const SingleListItemDisplay = ({ item, containQuantity }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: StateType) => state.userReducer)
  const { featuredProducts } = useAppSelector(
    (state: StateType) => state.productsReducer
  )

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ImageCarousel images={item.images} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              ${item.price}
            </Typography>
          </Stack>
          <Typography>{item.description}</Typography>
        </CardContent>
        {containQuantity && 'quantity' in item ? (
          <CardActions>
            <>
              x
              <TextField
                variant="standard"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
                value={item.quantity}
                sx={{
                  width: 40,
                }}
                onChange={(e) =>
                  dispatch(
                    updateCartItemQuantity({
                      id: item.id,
                      quantity: Number(e.target.value),
                    })
                  )
                }
              />{' '}
              = ${item.quantity * item.price}{' '}
            </>
            <Button
              size="small"
              onClick={() => navigate(`/products/${item.id}`)}
            >
              <SearchIcon />
            </Button>
            <Button
              size="small"
              onClick={() => dispatch(removeFromCart(Number(item.id)))}
            >
              <DeleteIcon />
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button
              size="small"
              onClick={() => navigate(`/products/${item.id}`)}
            >
              <SearchIcon />
            </Button>
            <Button
              size="small"
              disabled={isUpdating || isDeleting}
              onClick={() => dispatch(addToCart(item))}
            >
              <AddShoppingCartIcon />
            </Button>
            <ProductMutationFormDialog
              product={item}
              disabled={
                user === null ||
                user.role !== 'admin' ||
                isUpdating ||
                isDeleting
              }
              action="Update"
              onSubmit={updateProduct}
            />
            <Button
              size="small"
              disabled={
                user === null ||
                user.role !== 'admin' ||
                isUpdating ||
                isDeleting
              }
              onClick={() => deleteProduct(item.id)}
            >
              <DeleteIcon />
            </Button>
            {featuredProducts.findIndex(
              (product: Product) => item.id === product.id
            ) > -1 ? (
              user && user.role === 'admin' ? (
                <Button
                  size="small"
                  disabled={
                    user === null ||
                    user.role !== 'admin' ||
                    isUpdating ||
                    isDeleting
                  }
                  onClick={() => dispatch(removeFeaturedProduct(item.id))}
                >
                  <StarIcon />
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() =>
                    toast.error('Only admins can perform this action!')
                  }
                >
                  <StarIcon />
                </Button>
              )
            ) : (
              <Button
                size="small"
                disabled={
                  user === null ||
                  user.role !== 'admin' ||
                  isUpdating ||
                  isDeleting
                }
                onClick={() => dispatch(addFeaturedProduct(item as Product))}
              >
                <StarBorderIcon />
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </Grid>
  )
}

export default SingleListItemDisplay
