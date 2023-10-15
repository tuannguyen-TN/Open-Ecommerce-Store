import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface Props {
  quantities: number[]
  value: string
  onChange: (e: SelectChangeEvent) => void
}

const ItemPerPageMenu = ({ quantities, value, onChange }: Props) => {
  return (
    <FormControl variant="standard" sx={{ mx: 2, minWidth: 160 }}>
      <InputLabel id="item-per-page-select-label">Item per page</InputLabel>
      <Select
        labelId="item-per-page-select-label"
        id="item-per-page-select"
        value={value}
        onChange={onChange}
        label="Item per page"
      >
        <MenuItem value={0}>All</MenuItem>
        {quantities
          ? quantities.map((item: number) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  )
}

export default ItemPerPageMenu
