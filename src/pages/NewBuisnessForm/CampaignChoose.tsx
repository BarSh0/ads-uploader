import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useQuery } from 'react-query';
import { handleGetRequest } from '../../utils/api/axios';
import NewBuisnessContext from '../../contexts/NewBuisnessContext';

type Option = {
  name: string;
  id: string;
};

// id, url, label, handleSelect

export default function CampaignChoose() {
  const { newBuisness, insertValue, removeValue } = React.useContext(NewBuisnessContext);
  const newBuisnessId = newBuisness.adAccount?.id;
  const pageId = newBuisness.page?.pageId;
  const { data, isLoading, isError, refetch } = useQuery(
    'campaigns',
    () => handleGetRequest(`/facebook/${newBuisnessId}/${pageId}/campaigns`),
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
      removeValue('campaign');
      return;
    }
    insertValue('campaign', value);
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      onOpen={handleClick}
      onChange={(event, value) => handleChange(value)}
      disabled={!pageId}
      options={data || []}
      loading={isLoading}
      isOptionEqualToValue={(option: Option, value) => option.name === value.name}
      getOptionLabel={(option: Option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select A Campaign"
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
  );
}
