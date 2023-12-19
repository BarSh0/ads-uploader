import { FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import NewAutomationContext from '../../../contexts/NewAutomationContext';
import currencies from '../../../data/currencies';
import BasicList from '../../Common/BasicListv2';

const options = [
  'APP_INSTALLS',
  'BRAND_AWARENESS',
  'CONVERSIONS',
  'EVENT_RESPONSES',
  'LEAD_GENERATION',
  'LINK_CLICKS',
  'LOCAL_AWARENESS',
  'MESSAGES',
  'OFFER_CLAIMS',
  'OUTCOME_APP_PROMOTION',
  'OUTCOME_AWARENESS',
  'OUTCOME_ENGAGEMENT',
  'OUTCOME_LEADS',
  'OUTCOME_SALES',
  'OUTCOME_TRAFFIC',
  'PAGE_LIKES',
  'POST_ENGAGEMENT',
  'PRODUCT_CATALOG_SALES',
  'REACH',
  'STORE_VISITS',
  'VIDEO_VIEWS',
];

const NewAutomationForm = () => {
  const { newAutomation, insertValue } = React.useContext(NewAutomationContext);
  return (
    <BasicList title="properties">
      <TextField
        id="outlined-select-currency"
        select
        label="Currency"
        size="small"
        defaultValue="USD"
        value={newAutomation.currency}
        onChange={(e) => {
          insertValue('currency', e.target.value);
        }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Budget"
        type="number"
        size="small"
        value={newAutomation.budget}
        onChange={(e) => {
          insertValue('budget', e.target.value);
        }}
      />
      <TextField
        label="Amount"
        value={newAutomation.amount}
        size="small"
        onChange={(e) => {
          insertValue('amount', e.target.value);
        }}
      />
      <TextField
        id="outlined-select-currency"
        select
        label="of"
        size="small"
        value={newAutomation.of}
        onChange={(e) => {
          insertValue('of', e.target.value);
        }}
      >
        <MenuItem key={'hours'} value={'hours'}>
          Hours
        </MenuItem>
        <MenuItem key={'days'} value={'days'}>
          Days
        </MenuItem>
        <MenuItem key={'weeks'} value={'weeks'}>
          Weeks
        </MenuItem>
        <MenuItem key={'months'} value={'months'}>
          Months
        </MenuItem>
      </TextField>
      <FormControl>
        <FormLabel sx={{ marginBottom: '0.5rem' }}>Objective</FormLabel>
        <Select
          name={'objective'}
          fullWidth
          defaultValue={newAutomation['objective'] || ''}
          size="small"
          onChange={(e) => insertValue('objective', e.target.value)}
        >
          {options.map((option: any) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </BasicList>
  );
};

export default NewAutomationForm;
