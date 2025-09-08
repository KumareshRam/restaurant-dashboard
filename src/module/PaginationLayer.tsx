import React from 'react';
import { Box, Stack, Pagination } from '@mui/material';

const PaginationLayer: React.FC<{ totalPages: number, currentPage: number, setCurrentPage: (page: number) => void }> = (props) => {
  return (
    <div>
      {props.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Stack spacing={2}>
            <Pagination
              count={props.totalPages}
              page={props.currentPage}
              onChange={(event: React.ChangeEvent<unknown>, page: number) => props.setCurrentPage(page)}
              color="primary"
              showFirstButton
              showLastButton
              size="medium"
            />
          </Stack>
        </Box>
      )}

    </div>
  );
};

export default PaginationLayer;