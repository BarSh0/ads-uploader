import React from 'react';
import { useContext } from 'react';
import { FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import NewAutomationForm from '../AutomationComponents/Stepper/NewAutomationForm';
import BasicList from './BasicListv2';

const FacebookStep = () => {
  const { newAutomation, insertValue } = useContext(NewAutomationContext);

  const handleMultiSelectChange = (event: any, value: any, name: string) => {
    insertValue(name, value);
  };
  return (
    <>
      <NewAutomationForm />
      <BasicList title="Audience" label="Audience">
        <FormControl>
          <Autocomplete
            disablePortal
            id="audience"
            aria-label="audience"
            options={newAutomation.adAccount?.saved_audiences.data || []}
            defaultValue={newAutomation['audience'] || []}
            size="small"
            renderInput={(params) => <TextField {...params} />}
            getOptionLabel={(option: any) => option.name}
            onChange={(event, value) => handleMultiSelectChange(event, value, 'audience')}
            fullWidth
            multiple
          />
        </FormControl>
      </BasicList>
    </>
  );
};

export default FacebookStep;
