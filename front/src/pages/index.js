import React from "react"
import { Flex, Stack, Heading } from "@chakra-ui/react"
import { NFLTable } from "../features/nfl-table"

export default function Home() {
  return (
    <Flex p={6} justifyContent="center">
      <Stack maxWidth="6xl">
        <Heading alignSelf="center" size="4xl" mb="20">
          Rushing
        </Heading>
        <NFLTable />
      </Stack>
    </Flex>
  )
}
