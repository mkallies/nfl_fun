import React, { useState, useCallback } from "react"
import { Input } from "@chakra-ui/react"
import { debounce } from "../../utils"

export const SearchPlayers = ({ onChange }) => {
  const [value, setValue] = useState("")

  const debouncedSearch = useCallback(
    debounce(nextValue => onChange(nextValue), 300),
    []
  )

  const handleChange = ev => {
    const { value: nextValue } = ev.target

    setValue(nextValue)

    debouncedSearch(nextValue)
  }

  return (
    <Input
      width={1 / 3}
      placeholder="Search players"
      value={value}
      onChange={handleChange}
    />
  )
}
