import { Search } from "@mui/icons-material"
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core"
import { City, ListParams } from "models"
import { ChangeEvent } from "react"

import * as React from "react"
import { input } from "@testing-library/user-event/dist/types/utils"

export interface StudentFilterProps {
  filter: ListParams
  cityList: City[]
  onChange?: (newFilter: ListParams) => void

  onSearchChange?: (newFilter: ListParams) => void
}

export default function StudentFilter(props: StudentFilterProps) {
  const { filter, cityList, onChange, onSearchChange } = props
  const inputRef = React.useRef<HTMLInputElement>()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      // Sau khi filter ta phải reset về page 1 để hiển thị thông tin sản phẩm
      _page: 1,
    }

    onSearchChange(newFilter)
  }

  const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    }

    onChange(newFilter)
  }

  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return

    const value = e.target.value
    const [_sort, _order] = (value as string).split(".")

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    }

    onChange(newFilter)
  }

  const handleFilterClear = () => {
    if (!onChange) return

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      _limit: undefined,
      city: undefined,
      name_like: "",
    }

    onChange(newFilter)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by Name</InputLabel>
            <OutlinedInput
              inputRef={inputRef}
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              defaultValue={filter.name_like}
            ></OutlinedInput>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              variant="outlined"
              labelId="filterByCity"
              label="Filter by city"
              value={filter.city || ""}
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList &&
                cityList.map((city) => {
                  return (
                    <MenuItem key={city.code} value={city.code}>
                      {city.name}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="sortBy">Sort </InputLabel>
            <Select
              variant="outlined"
              labelId="sortBy"
              label="Sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ""}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleFilterClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
