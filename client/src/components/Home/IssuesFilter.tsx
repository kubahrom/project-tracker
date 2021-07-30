import React from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import {
  filterByList,
  priorityList,
  roleList,
  statusList,
  typeList,
} from '../../utils/constants';
import { useYourIssuesFilterStyles } from '../../styles/muiStyles';
import { CancelPresentation } from '@material-ui/icons';
import { IFilterBy } from './YourIssues';

interface IIssuesFilterProps {
  filterBy: IFilterBy;
  setFilterBy: React.Dispatch<React.SetStateAction<IFilterBy>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  resetFilter: () => void;
}

const IssuesFilter = ({
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  resetFilter,
}: IIssuesFilterProps) => {
  const classes = useYourIssuesFilterStyles();

  const handleChangeFilterBy = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilterBy({ type: e.target.value as string, value: '' });
  };
  const handleChangeFilterValue = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFilterBy({ ...filterBy, value: e.target.value as string });
  };

  const handleChangeSortBy = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(e.target.value as string);
  };

  const renderFilterValueOptions = () => {
    let filterValueOptions: string[] = [];
    switch (filterBy.type) {
      case 'Role':
        filterValueOptions = roleList;
        break;
      case 'Status':
        filterValueOptions = statusList;
        break;
      case 'Type':
        filterValueOptions = typeList;
        break;
      case 'Priority':
        filterValueOptions = priorityList;
        break;
      default:
        break;
    }

    return filterValueOptions.map((filterValue: string, index: number) => (
      <MenuItem key={index} value={filterValue}>
        {filterValue}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.filterWrapper}>
      <Typography
        variant="h6"
        component="h3"
        color="textSecondary"
        className={classes.title}
      >
        Issues Filter
        {(filterBy.value || sortBy) && (
          <Button
            variant="outlined"
            startIcon={<CancelPresentation color="primary" />}
            color="primary"
            onClick={resetFilter}
          >
            Reset filter
          </Button>
        )}
      </Typography>
      <FormControl variant="outlined" className={classes.inputField}>
        <InputLabel id="filter-by-label">Filter by</InputLabel>
        <Select
          labelId="filter-by-label"
          value={filterBy.type}
          onChange={handleChangeFilterBy}
          label="Filter by"
        >
          <MenuItem value="">None</MenuItem>
          {filterByList.map((filterCategory: string, index: number) => (
            <MenuItem key={index} value={filterCategory}>
              {filterCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.inputField}>
        <InputLabel id="filter-value-label">
          {filterBy.type !== '' && `${filterBy.type} value`}
        </InputLabel>
        <Select
          disabled={filterBy.type === ''}
          labelId="filter-value-label"
          value={filterBy.value}
          onChange={handleChangeFilterValue}
          label={filterBy.type !== '' && `${filterBy.type} value`}
        >
          {filterBy.type === '' && <MenuItem value="">None</MenuItem>}
          {renderFilterValueOptions()}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.inputField}>
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortBy}
          onChange={handleChangeSortBy}
          label="Sort by"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default IssuesFilter;
