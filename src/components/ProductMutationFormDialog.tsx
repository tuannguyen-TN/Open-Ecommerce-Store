import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'

import { ProductMutationOptions } from '../types/ProductMutationOptions'
import { Product } from '../types/Product'
import CategoryMenu from './CategoryMenu'

interface Props {
  product: Product
  disabled: boolean
  action: string
  onSubmit: any
}

const ProductMutationFormDialog = ({
  product,
  disabled,
  action,
  onSubmit,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const { id, ...restOfProduct } = product
  const [category, setCategory] = useState<string>('')
  const [productInfo, setProductInfo] = useState<ProductMutationOptions>(
    action === 'Update'
      ? { ...restOfProduct, categoryId: restOfProduct.category.id }
      : {
          title: '',
          price: 0,
          description: '',
          categoryId: 0,
          images: [],
        }
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (action === 'Create') {
      onSubmit(productInfo)
        .unwrap()
        .then(() => toast.success('New product created successfully!'))
        .catch(() => toast.error('New product created unsuccessfully!'))
    } else {
      onSubmit({ id, ...productInfo })
        .unwrap()
        .then(() => toast.success('Product updated successfully!'))
        .catch(() => toast.error('Product updated unsuccessfully!'))
    }
    setOpen(false)
  }
  return (
    <div>
      {action === 'Update' && (
        <Button size="small" onClick={handleClickOpen} disabled={disabled}>
          <EditIcon />
        </Button>
      )}
      {action === 'Create' && (
        <Button
          variant="contained"
          onClick={handleClickOpen}
          disabled={disabled}
        >
          {action} a product
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{action} product</DialogTitle>
        <DialogContent>
          <TextField
            id="product-title"
            label="Product name"
            type="text"
            fullWidth
            variant="standard"
            value={productInfo.title}
            onChange={(e) =>
              setProductInfo({ ...productInfo, title: e.target.value })
            }
          />
          <TextField
            id="product-price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={productInfo.price}
            onChange={(e) =>
              setProductInfo({ ...productInfo, price: Number(e.target.value) })
            }
          />
          <TextField
            id="product-description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={productInfo.description}
            onChange={(e) =>
              setProductInfo({ ...productInfo, description: e.target.value })
            }
          />
          <CategoryMenu
            value={category}
            onChange={(e: SelectChangeEvent) => {
              setCategory(e.target.value)
              setProductInfo({
                ...productInfo,
                categoryId: Number(e.target.value.split(' ')[0]),
              })
            }}
          />
          <TextField
            id="product-images"
            label="Image links"
            type="text"
            fullWidth
            variant="standard"
            value={productInfo.images.join(', ')}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                images: e.target.value.split(', '),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{action}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProductMutationFormDialog
