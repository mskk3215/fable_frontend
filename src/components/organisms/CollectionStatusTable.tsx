import * as React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useCollectedInsectsAndParksInfo } from "../../hooks/statistics/useCollectedInsectsAndParksInfo";
import { useUncollectedInsectsAndParksInfo } from "../../hooks/statistics/useUncollectedInsectsAndParksInfo";
import { CurrentLocationBox } from "../molecules/CurrentLocationBox";
import {
  destinationLocationState,
  searchWordState,
} from "../../store/atoms/searchWordState";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import styled from "styled-components";

export type TableData = {
  id: number;
  insectName: string;
  biologicalFamily: string;
  parkName: string;
};

export type Order = "asc" | "desc";

export type HeadCell = {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
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

function getComparator<Key extends keyof any>(
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

interface EnhancedTableProps {
  onRequestSort: (
    e: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => void;
  headCells: readonly HeadCell[];
  order: Order;
  orderBy: string;
  rowCount: number;
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { headCells, order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TableData) => (e: React.MouseEvent<unknown>) => {
      onRequestSort(e, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f2f2f2" }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type CollectionStatusTableProps = {
  isCollected: boolean;
  setCurrentLat?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentLng?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const CollectionStatusTable = (props: CollectionStatusTableProps) => {
  const { isCollected, setCurrentLat, setCurrentLng } = props;
  const { collectedInsectParkItems } = useCollectedInsectsAndParksInfo();
  const { uncollectedInsectParkItems } = useUncollectedInsectsAndParksInfo();
  const setSearchWord = useSetRecoilState(searchWordState);
  const setDestinationLocation = useSetRecoilState(destinationLocationState);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableData>("insectName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataToDisplay = isCollected
    ? collectedInsectParkItems
    : uncollectedInsectParkItems;

  const headCells: readonly HeadCell[] = [
    {
      id: "insectName",
      numeric: false,
      disablePadding: true,
      label: "昆虫名",
    },
    {
      id: "biologicalFamily",
      numeric: true,
      disablePadding: false,
      label: "科目",
    },
    {
      id: "parkName",
      numeric: true,
      disablePadding: false,
      label: isCollected ? "主な採集場所" : "近くの公園",
    },
  ];

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
              variant="h6"
              id="tableTitle"
              component="div"
              style={{ color: "gray" }}
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
                variant="h6"
                id="tableTitle"
                component="div"
                style={{ color: "gray" }}
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
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={dataToDisplay.length}
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
                      padding="none"
                    >
                      <SLink
                        to="/map"
                        onClick={() => setSearchWord(row.insectName)}
                      >
                        {`${row.insectName}(${row.insectSex})`}
                      </SLink>
                    </TableCell>
                    <TableCell align="left">{row.biologicalFamily}</TableCell>
                    <TableCell align="left">
                      <SLink
                        to="/direction"
                        onClick={() => setDestinationLocation(row.parkName)}
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
