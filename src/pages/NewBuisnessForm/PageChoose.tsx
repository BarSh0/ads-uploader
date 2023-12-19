import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import { handleGetRequest } from '../../utils/api/axios';
import NewBuisnessContext from '../../contexts/NewBuisnessContext';

type Option = {
  name: string;
  id: string;
  picture: string;
};

const PageChoose = () => {
  const { newBuisness, insertValue, removeValue } = React.useContext(NewBuisnessContext);
  const newBuisnessId = newBuisness.adAccount?.id;
  const { data, isLoading, isError, refetch } = useQuery(
    'pages',
    () => handleGetRequest(`/facebook/${newBuisnessId}/accounts`),
    {
      enabled: false,
    }
  );

  const handleClick = () => {
    refetch();
    console.log(data);
  };

  if (isError) {
    console.log(isError);
  }

  const handleChange = (value: any) => {
    if (!value) {
      removeValue('page');
      return;
    }
    insertValue('page', value);
  };

  return (
    <Autocomplete
      disablePortal
      id="page"
      autoHighlight
      disabled={!newBuisnessId}
      onOpen={handleClick}
      onChange={(event, value) => handleChange(value)}
      options={data || []}
      getOptionLabel={(option: Option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="30" srcSet={option.picture} src={option.picture} alt="" />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select A Page"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
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
  );
};

export default PageChoose;
