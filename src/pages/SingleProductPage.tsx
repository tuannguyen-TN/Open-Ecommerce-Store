import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import {
  useDeleteProductMutation,
  useFetchSingleProductQuery,
  useUpdateProductMutation,
} from '../redux/queries/productQueries'
import ImageCarousel from '../components/ImageCarousel'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { addToCart } from '../redux/reducers/cartReducer'
import ProductMutationFormDialog from '../components/ProductMutationFormDialog'
import { StateType } from '../redux/store/store'

const SingleProductPage = () => {
  const params = useParams()
  const productId = Number(params.id)
  const { data, isLoading, isError } = useFetchSingleProductQuery(productId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: StateType) => state.userReducer)

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  return (
    <div>
      {isLoading && <LinearProgress />}
      {isError && (
        <Typography variant="h4">
          Item not found. Click <Link to="/">here</Link> to get back to
          homepage.
        </Typography>
      )}
      {data ? (
        <Stack direction="row" alignItems="flex-start" spacing={5}>
          <Card
            sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <ImageCarousel images={data.images} />
            <CardActions>
              <Button
                size="small"
                disabled={isUpdating || isDeleting}
                onClick={() => dispatch(addToCart(data))}
              >
                <AddShoppingCartIcon />
              </Button>
              <ProductMutationFormDialog
                product={data}
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
                onClick={() =>
                  deleteProduct(data.id).then(() => navigate('/products'))
                }
              >
                <DeleteIcon />
              </Button>
            </CardActions>
          </Card>
          <Stack direction="column" spacing={5} alignItems="flex-start">
            <Typography variant="h3">{data.title}</Typography>
            <Typography variant="h4">${data.price}</Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={5}
            >
              <Typography variant="h6">Description</Typography>
              <Typography>{data.description}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={7.5}
            >
              <Typography variant="h6">Category</Typography>
              <Typography>{data.category.name}</Typography>
            </Stack>
          </Stack>
        </Stack>
      ) : null}
    </div>
  )
}

export default SingleProductPage
