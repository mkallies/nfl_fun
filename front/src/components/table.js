import React from "react"
import { Box, Text, Flex, Button } from "@chakra-ui/react"
import { useTable, usePagination } from "react-table"

const Table = ({ columns, data, onNext, onPrev, hasMore, isFetching }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 },
      manualPagination: true,
      pageCount: -1,
    },
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    nextPage,
    previousPage,
    state: { pageIndex },
  } = tableInstance

  const handleNextPageClick = () => {
    nextPage()
    onNext()
  }

  const handlePreviousPageClick = () => {
    previousPage()
    onPrev()
  }

  return (
    // apply the table props
    <>
      <Flex justifyContent="flex-end" mb="4">
        <Button onClick={handlePreviousPageClick} disabled={pageIndex === 0}>
          Previous Page
        </Button>

        <Button ml="6" disabled={!hasMore} onClick={handleNextPageClick}>
          Next Page
        </Button>
      </Flex>

      <Box as="table" display="table" width="100%" {...getTableProps()}>
        <Box as="thead" display="table-header-group" bg="gray.200" py="6">
          {
            // Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <Text
                      as="th"
                      px="4"
                      py="2"
                      {...column.getHeaderProps({
                        ...column.style,
                        onClick: column.onClick,
                      })}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                      <span>
                        {column.isDesc && " 🔽"}
                        {column.isAsc && " 🔼"}
                      </span>
                    </Text>
                  ))
                }
              </tr>
            ))
          }
        </Box>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <Box
                  as="tr"
                  display="table-row"
                  height="48px"
                  borderBottom="1px"
                  borderColor="gray.300"
                  color={isFetching ? "gray.300" : "gray.800"}
                  {...row.getRowProps()}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <Text
                          as="td"
                          px="4"
                          py="2"
                          display="table-cell"
                          {...cell.getCellProps(cell.column.style)}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </Text>
                      )
                    })
                  }
                </Box>
              )
            })
          }
        </tbody>
      </Box>
      <Flex justifyContent="flex-end" my="4">
        <Button onClick={handlePreviousPageClick} disabled={pageIndex === 0}>
          Previous Page
        </Button>

        <Button ml="6" disabled={!hasMore} onClick={handleNextPageClick}>
          Next Page
        </Button>
      </Flex>
    </>
  )
}

export { Table }
