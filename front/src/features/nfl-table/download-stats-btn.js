import React from "react"
import axios from "axios"
import { Button } from "@chakra-ui/react"
import { BiDownload } from "react-icons/bi"

export const DownloadStatsBtn = ({ input, sortBy, orderBy }) => {
  const handleClick = async () => {
    let url = "http://localhost:4000/v1/rushing/download"

    if (input) {
      url = `${url}?name=${input}`
    }

    if (sortBy && orderBy) {
      url = `${url}${input ? "&" : "?"}sortBy=${sortBy}&orderBy=${orderBy}`
    }

    const res = await axios({
      method: "get",
      url,
      responseType: "blob",
    })

    const href = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement("a")
    link.href = href
    link.setAttribute("download", "stats.csv")
    document.body.appendChild(link)
    link.click()
  }

  return (
    <Button
      rightIcon={<BiDownload />}
      isLoading={false}
      colorScheme="blue"
      loadingText="Fetching dataset"
      alignSelf="center"
      onClick={handleClick}
    >
      Download Stats
    </Button>
  )
}
