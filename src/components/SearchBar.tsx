import { Autocomplete, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const SearchBar = ({
  searchData,
  setter,
  label = 'Search',
}: {
  searchData: Array<string>;
  setter: Function;
  label?: String;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(searchData);

  console.log(searchData);

  const filterData = (value: string) => {
    const filteredData = searchData.filter((item) => {
      return item.toLowerCase().includes(value.toLowerCase());
    });
    setter(filteredData);
    if (value === '') {
      setter(searchData);
    }
  };

  return (
    <Stack>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        renderInput={(params) => <TextField {...params} label={label} />}
        onInputChange={(event, value) => filterData(value)}
        fullWidth
        size="small"
        multiple
        groupBy={(option) => option[0].toUpperCase()}
      />
    </Stack>
  );
};

export default SearchBar;
