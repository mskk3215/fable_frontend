import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { HeadCell, Order, TableData } from "../../types/statistics";

type Props = {
  onRequestSort: (
    e: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => void;
  headCells: readonly HeadCell[];
  order: Order;
  orderBy: string;
  rowCount: number;
};

export const SortableTableHead = (props: Props) => {
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
