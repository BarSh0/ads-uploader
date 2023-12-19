import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useQuery } from 'react-query';
import NewBuisnessContext from '../../contexts/NewBuisnessContext';
import { handleGetRequest } from '../../utils/api/axios';

type Option = {
  name: string;
  id: string;
};

// id, url, label, handleSelect

export default function AsyncSearch() {
  const { newBuisness, insertValue, removeValue } = React.useContext(NewBuisnessContext);
  const { data, isLoading, isError, refetch } = useQuery('adAccounts', () => handleGetRequest('/facebook/adaccounts'), {
    enabled: false,
  });

  console.log(newBuisness);
  const handleClick = () => {
    refetch();
  };

  if (isError) {
    console.log(isError);
  }

  const handleChange = (value: any) => {
    if (!value) {
      removeValue('adAccount');
      return;
    }
    insertValue('adAccount', value);
  };

  const handleAudience = (value: any) => {
    if (!value) {
      removeValue('audience');
      return;
    }
    insertValue('audience', value);
  };

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        onOpen={handleClick}
        onChange={(event, value) => handleChange(value)}
        options={data || []}
        loading={isLoading}
        isOptionEqualToValue={(option: Option, value) => option.name === value.name}
        getOptionLabel={(option: Option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select An Ad Account"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Autocomplete
        id="audience"
        onOpen={handleClick}
        onChange={(event, value) => handleAudience(value)}
        disabled={!newBuisness.adAccount}
        options={newBuisness.adAccount?.saved_audiences.data || []}
        loading={isLoading}
        isOptionEqualToValue={(option: Option, value) => option.name === value.name}
        getOptionLabel={(option: Option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select An Audience"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
