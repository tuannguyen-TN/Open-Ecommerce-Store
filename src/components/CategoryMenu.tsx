import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

import { Category } from '../types/Category'
import { useCategoriesContext } from '../hooks/useCategoriesContext'

interface Props {
  value: string
  onChange: (e: SelectChangeEvent) => void
}

const CategoryMenu = ({ value, onChange }: Props) => {
  const categories = useCategoriesContext()

  return (
    <FormControl variant="standard" sx={{ minWidth: 160 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={value}
        onChange={onChange}
        label="Category"
      >
        <MenuItem value="">
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src="https://i.imgur.com/Dmh8Zim.png" />
            <Typography>None</Typography>
          </Stack>
        </MenuItem>
        {categories
          ? categories.map((category: Category) => (
              <MenuItem
                key={category.id}
                value={category.id + ' ' + category.name}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src={category.image} />
                  <Typography>{category.name}</Typography>
                </Stack>
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  )
}

export default CategoryMenu
