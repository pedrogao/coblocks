import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List, usePagination, EditButton, ShowButton, DeleteButton } from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  IconButton,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

export const RoomList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "projectId",
        accessorKey: "projectId",
        header: translate("rooms.fields.projectId"),
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
          filterOperator: "eq",
        },
      },
      {
        id: "id",
        accessorKey: "id",
        header: translate("rooms.fields.id"),
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
          filterOperator: "eq",
        },
      },
      {
        id: "name",
        accessorKey: "name",
        header: translate("rooms.fields.name"),
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        id: "status",
        accessorKey: "status",
        header: translate("rooms.fields.status"),
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return <span>{getValue() as string}</span>;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: translate("table.actions"),
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          const val = `${getValue()}`;
          return (
            <HStack>
              <ShowButton hideText recordItemId={val} />
              <EditButton hideText recordItemId={val} />
              <DeleteButton hideText recordItemId={val} />
            </HStack>
          );
        },
      },
    ],
    [translate],
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      sorters,
      setSorters,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      sorters: {
        initial: [
          {
            field: "projectId",
            order: "asc",
          },
          {
            field: "id",
            order: "asc",
          },
        ],
      },
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => {
              return (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sortLabel = header.column.getCanSort()
                      ? {
                          asc: " ⬆️",
                          desc: " ⬇️",
                          false: " 🈚",
                        }[`${header.column.getIsSorted()}`]
                      : "";

                    return (
                      <Th key={header.id}>
                        <Box>
                          {!header.isPlaceholder &&
                            flexRender(header.column.columnDef.header, header.getContext())}
                          <Text
                            as="span"
                            fontSize="xs"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {sortLabel}
                          </Text>
                          {header.column.getCanFilter() && (
                            <Input
                              variant="flushed"
                              size="xs"
                              marginLeft={3}
                              htmlSize={8}
                              width="auto"
                              value={header.column.getFilterValue() as string}
                              onChange={(e) => {
                                header.column.setFilterValue(e.target.value);
                              }}
                              placeholder={"🔍"}
                            />
                          )}
                        </Box>
                      </Th>
                    );
                  })}
                </Tr>
              );
            })}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination current={current} pageCount={pageCount} setCurrent={setCurrent} />
    </List>
  );
};

type PaginationProps = {
  current: number;
  pageCount: number;
  setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ current, pageCount, setCurrent }) => {
  const pagination = usePagination({
    current,
    pageCount,
  });

  return (
    <Box display="flex" justifyContent="flex-end">
      <HStack my="3" spacing="1">
        {pagination?.prev && (
          <IconButton
            aria-label="previous page"
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant="outline"
          >
            <IconChevronLeft size="18" />
          </IconButton>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === "string") return <span key={page}>...</span>;

          return (
            <Button
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? "solid" : "outline"}
            >
              {page}
            </Button>
          );
        })}
        {pagination?.next && (
          <IconButton
            aria-label="next page"
            onClick={() => setCurrent(current + 1)}
            variant="outline"
          >
            <IconChevronRight size="18" />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
};
