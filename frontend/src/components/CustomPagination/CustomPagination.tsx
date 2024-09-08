import React from "react";
import { Pagination } from "@mui/material";

interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <Pagination
      count={Math.ceil(totalItems / itemsPerPage)}
      page={currentPage}
      onChange={onPageChange}
      color="primary"
      shape="rounded"
      showFirstButton
      showLastButton
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#007bff",
          borderRadius: "50%",
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          backgroundColor: "#007bff",
          color: "#fff",
        },
      }}
    />
  );
};

export default CustomPagination;
