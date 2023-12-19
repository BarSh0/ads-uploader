import { Autocomplete, FormControl, FormLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import { handleGetRequest } from '../../utils/api/axios';
import BasicList from './BasicListv2';

const campaignFields = [
  {
    name: 'campaignName',
    label: 'Campaign Name',
    type: 'text',
    component: 'TextField',
    required: true,
  },

  {
    name: 'dailyBudget',
    label: 'Daily Budget',
    type: 'number',
    component: 'TextField',
    required: true,
  },
];

const adGroupFields = [
  {
    name: 'placement',
    label: 'Placement',
    type: 'text',
    component: 'Select',
    required: true,
    options: [
      'ALL_ON_TWITTER',
      'PUBLISHER_NETWORK',
      'TAP_BANNER',
      'TAP_FULL',
      'TAP_FULL_LANDSCAPE',
      'TAP_NATIVE',
      'TAP_MRECT',
      'TWITTER_PROFILE',
      'TWITTER_REPLIES',
      'TWITTER_SEARCH',
      'TWITTER_TIMELINE',
    ],
  },
  {
    name: 'productType',
    label: 'Product Type',
    type: 'text',
    component: 'Select',
    required: true,
    options: ['PROMOTED_TWEETS', 'PROMOTED_ACCOUNTS', 'PROMOTED_TRENDS'],
  },
  {
    name: 'objective',
    label: 'Objective',
    type: 'text',
    component: 'Select',
    required: true,
    options: [
      'APP_ENGAGEMENTS',
      'APP_INSTALLS',
      'REACH',
      'FOLLOWERS',
      'ENGAGEMENTS',
      'VIDEO_VIEWS',
      'PREROLL_VIEWS',
      'WEBSITE_CLICKS',
    ],
  },
];

const TwitterStep = () => {
  const { newAutomation, insertValue } = useContext(NewAutomationContext);
  const { data: fundingInstruments, isLoading: loading1 } = useQuery('twitter-funding-instruments', () =>
    handleGetRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/funding-instruments`)
  );
  const { data: audiences, isLoading: loading2 } = useQuery('twitter-audiences', () =>
    handleGetRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/audiences`)
  );
  const { data: targetingCriteria, isLoading: loading3 } = useQuery('twitter-targeting-criteria', () =>
    handleGetRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/targeting-criteria`)
  );

  const handleChange = (event: any) => {
    insertValue(event.target.name, event.target.value);
  };

  const handleMultiSelectChange = (event: any, value: any, name: string) => {
    insertValue(name, value);
  };

  if (loading1 || loading2 || loading3) return <div>Loading...</div>;

  return (
    <Stack flexDirection={'row'} gap={'1rem'}>
      <BasicList title="Campaign" label="Campaign">
        {campaignFields.map((field) => {
          return (
            <FormControl fullWidth key={field.label}>
              <FormLabel sx={{ marginBottom: '0.5rem' }}>{field.label}</FormLabel>
              <TextField
                name={field.name}
                size="small"
                variant="outlined"
                value={newAutomation[field.name]}
                onChange={handleChange}
                required={field.required}
                type={field.type}
              />
            </FormControl>
          );
        })}
        <FormControl fullWidth>
          <FormLabel sx={{ marginBottom: '0.5rem' }}>Funding Instrument</FormLabel>
          <Select
            name="fundingInstrument"
            fullWidth
            defaultValue={newAutomation['fundingInstrument'] || ''}
            size="small"
            onChange={handleChange}
          >
            {fundingInstruments.map((fundingInstrument: any) => {
              return (
                <MenuItem key={fundingInstrument.id} value={fundingInstrument.id}>
                  {fundingInstrument.description}
                </MenuItem>
              );
            })}
          </Select>
          {newAutomation['fundingInstrument'] && (
            <p>
              Currency Type:
              {
                fundingInstruments.find(
                  (fundingInstrument: any) => fundingInstrument.id === newAutomation['fundingInstrument']
                )?.currency
              }
            </p>
          )}
        </FormControl>
      </BasicList>
      <BasicList title="Ad Group" label="adGroup">
        {adGroupFields.map((field) => {
          return (
            <FormControl fullWidth key={field.label}>
              <FormLabel sx={{ marginBottom: '0.5rem' }}>{field.label}</FormLabel>
              {field.component === 'TextField' ? (
                <TextField
                  name={field.name}
                  size="small"
                  variant="outlined"
                  value={newAutomation[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  type={field.type}
                />
              ) : (
                <Select
                  name={field.name}
                  fullWidth
                  defaultValue={newAutomation[field.name] || ''}
                  size="small"
                  onChange={handleChange}
                >
                  {field.options?.map((option: string) => {
                    return (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          );
        })}
      </BasicList>
      <BasicList title="Audience" label="Audience">
        <FormControl>
          <FormLabel sx={{ marginBottom: '0.5rem' }}>Targeting Criteria</FormLabel>
          <Autocomplete
            disablePortal
            id="targetingValue"
            aria-label="targetingValue"
            loading={loading3}
            options={targetingCriteria}
            defaultValue={newAutomation['targetingValue'] || []}
            size="small"
            renderInput={(params) => <TextField {...params} />}
            getOptionLabel={(option: any) => option.name}
            onChange={(event, value) => handleMultiSelectChange(event, value, 'targetingValue')}
            fullWidth
            multiple
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ marginBottom: '0.5rem' }}>Audiences</FormLabel>
          <Autocomplete
            disablePortal
            id="audiences"
            loading={loading2}
            options={audiences}
            renderInput={(params) => <TextField {...params} />}
            getOptionLabel={(option: any) => option.name}
            onChange={(event, value) => handleMultiSelectChange(event, value, 'audiences')}
            fullWidth
            size="small"
            multiple
          />
        </FormControl>
      </BasicList>
    </Stack>
  );
};

export default TwitterStep;
