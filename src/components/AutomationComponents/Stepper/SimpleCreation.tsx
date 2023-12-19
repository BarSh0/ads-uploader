import React from 'react';
import { useQuery } from 'react-query';
import NewAutomationContext from '../../../contexts/NewAutomationContext';
import { handleGetRequest } from '../../../utils/api/axios';
import { FormControl, FormLabel, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const SimpleCreation = () => {
  const { newAutomation, insertValue } = React.useContext(NewAutomationContext);
  const { data, isLoading } = useQuery(`${newAutomation.platform}-campaigns`, () =>
    handleGetRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/campaigns`)
  );

  const handleMultiSelectChange = (event: any, value: any, name: string) => {
    insertValue(name, value);
  };

  return (
    <FormControl sx={{ padding: 5 }}>
      <FormLabel sx={{ marginBottom: '0.5rem' }}>Campaigns</FormLabel>
      <Autocomplete
        disablePortal
        id="campaigns"
        loading={isLoading}
        options={data}
        renderInput={(params) => <TextField {...params} />}
        getOptionLabel={(option: any) => option.name}
        onChange={(event, value) => handleMultiSelectChange(event, value, 'campaign')}
        fullWidth
        size="small"
      />
    </FormControl>
  );
};

export default SimpleCreation;
