import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  List,
  usePagination,
  EditButton,
  ShowButton,
  DeleteButton,
  MarkdownField,
  DateField,
} from "@refinedev/chakra-ui";
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
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: translate("blog_posts.fields.id"),
      },
      {
        id: "title",
        accessorKey: "title",
        header: translate("blog_posts.fields.title"),
      },
      {
        id: "content",
        accessorKey: "content",
        header: translate("blog_posts.fields.content"),
        cell: function render({ getValue }) {
          return (
            <MarkdownField value={getValue<string>()?.slice(0, 80) + "..."} />
          );
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: translate("blog_posts.fields.status"),
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: translate("blog_posts.fields.createdAt"),
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        },
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: translate("blog_posts.fields.updatedAt"),
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        },
      },
      {
        id: "category",
        header: translate("blog_posts.fields.category"),
        accessorKey: "category.title",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <HStack>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </HStack>
          );
        },
      },
    ],
    [translate]
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  setOptions((prev) => {
    return {
      ...prev,
      meta: {
        ...prev.meta,
      },
    };
  });

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  );
};

type PaginationProps = {
  current: number;
  pageCount: number;
  setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageCount,
  setCurrent,
}) => {
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
