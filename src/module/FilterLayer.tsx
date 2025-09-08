import { Box, Button, Fade, FormControl, IconButton, InputLabel, MenuItem, Paper, Popper, Select, Stack, Typography } from '@mui/material';
import { X } from 'lucide-react';
import React from 'react';

const FilterLayer: React.FC<{ filterOpen: boolean, filterAnchorEl: HTMLElement | null, handleFilterClose: () => void, handleApplyFilters: () => void, handleClearTempFilters: () => void, tempFilterType: string, tempFilterStatus: string, setTempFilterType: (value: string) => void, setTempFilterStatus: (value: string) => void }> = (props) => {
  return (
    <Popper
      open={props.filterOpen}
      anchorEl={props.filterAnchorEl}
      placement="bottom-end"
      transition
      sx={{ zIndex: 1300 }}
      disablePortal={false}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            elevation={8}
            sx={{
              p: 2,
              mt: 1,
              minWidth: 320,
              maxWidth: 400,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h3">
                  Filter Options
                </Typography>
                <IconButton
                  onClick={props.handleFilterClose}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <X size={16} />
                </IconButton>
              </Box>

              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="popper-filter-type-label">Order Type</InputLabel>
                  <Select
                    labelId="popper-filter-type-label"
                    value={props.tempFilterType}
                    label="Order Type"
                    onChange={(e) => {
                      e.stopPropagation();
                      props.setTempFilterType(e.target.value);
                    }}
                    size="small"
                    MenuProps={{
                      disableAutoFocusItem: true,
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                    }}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Dine In">Dine In</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="popper-filter-status-label">Order Status</InputLabel>
                  <Select
                    labelId="popper-filter-status-label"
                    value={props.tempFilterStatus}
                    label="Order Status"
                    onChange={(e) => props.setTempFilterStatus(e.target.value)}
                    size="small"
                    MenuProps={{
                      disableAutoFocusItem: true,
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                    }}
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="In Transit">In Transit</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={props.handleClearTempFilters}
                    startIcon={<X size={14} />}
                    size="small"
                    fullWidth
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    onClick={props.handleApplyFilters}
                    size="small"
                    fullWidth
                  >
                    Apply
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default FilterLayer;