import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface Props {
  trends: string[]
  value: string
  onChange: (e: SelectChangeEvent) => void
}

const SortingOptionsMenu = ({ trends, value, onChange }: Props) => {
  return (
    <FormControl variant="standard" sx={{ mx: 2, minWidth: 180 }}>
      <InputLabel id="sorting-options-select-label">
        Sort products by price
      </InputLabel>
      <Select
        labelId="sorting-options-select-label"
        id="sorting-options-select"
        value={value}
        onChange={onChange}
        label="Sorting option"
      >
        <MenuItem value={''}>None</MenuItem>
        {trends
          ? trends.map((item: string) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  )
}

export default SortingOptionsMenu
