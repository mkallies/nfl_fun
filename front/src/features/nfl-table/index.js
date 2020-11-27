import React, { useState, useMemo, useEffect } from "react"
import { Stack, Flex, Spinner, Skeleton } from "@chakra-ui/react"
import { Table } from "../../components/table"
import { SearchPlayers } from "./search-players"
import { DownloadStatsBtn } from "./download-stats-btn"
import axios from "axios"

const isEmpty = val => val == null || !(Object.keys(val) || val).length

const NFLTable = () => {
  const [page, setPage] = useState(0)
  const [rushingData, setData] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const [input, setInput] = useState("")

  const [sortBy, setSortBy] = useState("")
  const [orderBy, setOrderBy] = useState("")

  const fetchStats = async () => {
    setIsLoading(true)

    let url = `http://localhost:4000/v1/rushing?page=${page}`

    if (input) {
      url = `${url}&name=${input}`
    }

    if (sortBy && orderBy) {
      url = `${url}&sortBy=${sortBy}&orderBy=${orderBy}`
    }

    try {
      const { data } = await axios.get(url)

      setHasMore(data.hasMore)
      setData([...data.stats])
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchStats()
  }, [page, input, orderBy, sortBy])

  const data = useMemo(() => rushingData, [rushingData])

  const columns = React.useMemo(
    () => [
      {
        Header: "Player",
        accessor: "player",
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Team",
        accessor: "team",
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Pos",
        accessor: "position",
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Att/G",
        accessor: "attempts_per_game",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Att",
        accessor: "attempts",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Yds",
        accessor: "total_yards",
        isDesc: orderBy === "DESC" && sortBy === "total_yards",
        isAsc: orderBy === "ASC" && sortBy === "total_yards",
        style: {
          textAlign: "right",
          _hover: {
            bg: "gray.400",
            cursor: "pointer",
          },
        },
        onClick: () => {
          if (sortBy === "total_yards") {
            if (orderBy === "DESC") {
              setOrderBy("ASC")
            } else if (!orderBy) {
              setOrderBy("DESC")
            } else {
              setOrderBy("")
            }
          } else {
            setOrderBy("DESC")
            setSortBy("total_yards")
          }
        },
      },
      {
        Header: "Avg",
        accessor: "avg_rush_per_attempt",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Yds/G",
        accessor: "rushing_yards_per_game",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "TD",
        accessor: "rushing_tds",
        isDesc: orderBy === "DESC" && sortBy === "rushing_tds",
        isAsc: orderBy === "ASC" && sortBy === "rushing_tds",
        style: {
          textAlign: "right",
          _hover: {
            bg: "gray.400",
            cursor: "pointer",
          },
        },
        onClick: () => {
          if (sortBy === "rushing_tds") {
            if (orderBy === "DESC") {
              setOrderBy("ASC")
            } else if (!orderBy) {
              setOrderBy("DESC")
            } else {
              setOrderBy("")
            }
          } else {
            setOrderBy("DESC")
            setSortBy("rushing_tds")
          }
        },
      },
      {
        Header: "Lng",
        accessor: "longest_rush",
        isDesc: orderBy === "DESC" && sortBy === "longest_rush",
        isAsc: orderBy === "ASC" && sortBy === "longest_rush",
        style: {
          textAlign: "right",
          _hover: {
            bg: "gray.400",
            cursor: "pointer",
          },
        },
        onClick: () => {
          if (sortBy === "longest_rush") {
            if (orderBy === "DESC") {
              setOrderBy("ASC")
            } else if (!orderBy) {
              setOrderBy("DESC")
            } else {
              setOrderBy("")
            }
          } else {
            setOrderBy("DESC")
            setSortBy("longest_rush")
          }
        },
      },
      {
        Header: "1st",
        accessor: "rushing_first_down",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "1st%",
        accessor: "rushing_first_down_pct",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "20+",
        accessor: "rushing_20",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "40+",
        accessor: "rushing_40",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "FUM",
        accessor: "fumbles",
        style: {
          textAlign: "right",
        },
      },
    ],
    [sortBy, orderBy]
  )

  const handlePreviousPageClick = () => {
    setPage(old => Math.max(old - 1, 0))
  }

  const handleNextPageClick = () => {
    setPage(old => (hasMore ? old + 1 : old))
  }

  const handleInput = value => {
    setPage(0)
    setInput(value)
  }

  const showSkeleton = isEmpty(data) && isLoading
  const isFetching = !isEmpty(data) && isLoading

  return (
    <Stack>
      <Flex justifyContent="space-between" mb="10">
        <SearchPlayers onChange={handleInput} />

        <DownloadStatsBtn input={input} sortBy={sortBy} orderBy={orderBy} />
      </Flex>

      {showSkeleton ? (
        <Stack width="1100px">
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : (
        <Table
          columns={columns}
          data={data}
          isFetching={isFetching}
          onNext={handleNextPageClick}
          onPrev={handlePreviousPageClick}
          hasMore={hasMore}
        />
      )}
    </Stack>
  )
}

export { NFLTable }
