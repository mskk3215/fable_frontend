"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Link from "next/link";
import { CurrentLocationBox } from "./CurrentLocationBox";
import { SortableTableHead } from "./SortableTableHead";
import {
  originLocationState,
  searchWordState,
  useDestinationLocation,
} from "../../../store/atoms/searchWordState";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Box, Paper } from "@mui/material";
import styled from "styled-components";
import { HeadCell, Order, TableData } from "../../../types/statistics";

type Props = {
  isCollected: boolean;
  setCurrentLat?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentLng?: React.Dispatch<React.SetStateAction<number | undefined>>;
  collectedInsectParkItems?: TableData[];
  uncollectedInsectParkItems?: TableData[];
  pageSize: number;
};

export const CollectionStatusTable = (props: Props) => {
  const {
    isCollected,
    setCurrentLat,
    setCurrentLng,
    collectedInsectParkItems,
    uncollectedInsectParkItems,
    pageSize,
  } = props;

  const setSearchWord = useSetRecoilState(searchWordState);
  const { saveDestinationLocation } = useDestinationLocation();
  const originLocation = useRecoilValue(originLocationState);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableData>("insectName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataToDisplay = isCollected
    ? collectedInsectParkItems || []
    : uncollectedInsectParkItems || [];

  const headCells: readonly HeadCell[] = [
    {
      id: "insectName",
      numeric: false,
      disablePadding: false,
      label: "昆虫名",
      width: "35",
    },
    {
      id: "biologicalFamily",
      numeric: true,
      disablePadding: false,
      label: "科目",
      width: "25%",
    },
    {
      id: "parkName",
      numeric: true,
      disablePadding: false,
      label: isCollected
        ? "主な採集場所"
        : originLocation
        ? "近くの公園"
        : "採集できる公園",
      width: "40%",
    },
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataToDisplay.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(dataToDisplay, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, dataToDisplay]
  );

  const handleRequestSort = (
    e: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof TableData>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "10px",
      }}
    >
      <Paper sx={{ border: "1px solid lightgray" }}>
        {isCollected ? (
          <Toolbar disableGutters>
            <Typography
              variant={pageSize > 8 ? "h5" : "subtitle1"}
              id="tableTitle"
              component="div"
              style={{ color: "gray" }}
              sx={{ pl: 2 }}
            >
              採集済み昆虫一覧
            </Typography>
          </Toolbar>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 1,
              pb: 1,
            }}
          >
            <Box>
              <Typography
                variant={pageSize > 8 ? "h5" : "subtitle1"}
                id="tableTitle"
                component="div"
                style={{ color: "gray" }}
                sx={{ pl: 2 }}
              >
                未採集昆虫一覧
              </Typography>
            </Box>
            <CurrentLocationBox
              setCurrentLat={setCurrentLat}
              setCurrentLng={setCurrentLng}
            />
          </Box>
        )}
        <TableContainer>
          <Table sx={{ minWidth: 350 }} aria-labelledby="tableTitle">
            <SortableTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={dataToDisplay.length}
              pageSize={pageSize}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow key={index} sx={{ cursor: "pointer" }}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                      sx={{
                        fontSize: pageSize > 8 ? "16px" : "12px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                          fontSize: pageSize > 8 ? "16px" : "12px",
                        }}
                      >
                        {row.insectName}
                      </Typography>
                      <SLink
                        href={`/map`}
                        onClick={() => setSearchWord(row.insectName)}
                      >
                        {`(map`}
                      </SLink>
                      {`,`}
                      <SLink
                        href={`/picturebook/${row.insectId}`}
                      >{`図鑑)`}</SLink>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: pageSize > 8 ? "16px" : "12px",
                      }}
                    >
                      {row.biologicalFamily}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: pageSize > 8 ? "16px" : "12px",
                      }}
                    >
                      <SLink
                        href={`/direction`}
                        onClick={() => saveDestinationLocation(row.parkName)}
                      >
                        {row.parkName}
                      </SLink>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ backgroundColor: "#f2f2f2" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataToDisplay.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

const SLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
});
