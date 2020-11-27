import React from "react"
import { Flex, Stack, Heading } from "@chakra-ui/react"
import { NFLTable } from "../features/nfl-table"
import { QueryCache, ReactQueryCacheProvider } from "react-query"

const queryCache = new QueryCache()

export default function Home() {
  return (
    <Flex p={6} justifyContent="center">
      <Stack maxWidth="6xl">
        <Heading alignSelf="center" size="4xl" mb="20">
          Rushing
        </Heading>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <NFLTable />
        </ReactQueryCacheProvider>
      </Stack>
    </Flex>
  )
}
