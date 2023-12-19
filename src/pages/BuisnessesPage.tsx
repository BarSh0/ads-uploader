import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import BuisnessCard from '../components/BuisnessCard/BuisnessCard';
import Dialog from '../components/Common/Dialog';
import SearchBar from '../components/SearchBar';
import NewBuisnessContext from '../contexts/NewBuisnessContext';
import useKeyPress from '../hooks/useKeyPress';
import { handleGetRequest, handlePostRequest } from '../utils/api/axios';
import AsyncSearch from './NewBuisnessForm/AsyncSearch';
import CampaignChoose from './NewBuisnessForm/CampaignChoose';
import PageChoose from './NewBuisnessForm/PageChoose';
import { FilterBar } from './styles';

type Buissness = {
  _id: string;
  businessId: string;
  campaign: { id: string; name: string };
  name: string;
  page: { id: string; name: string; pageId: string; picture: string };
  audience: { id: string; name: string };
};

const BuisnessesPage = () => {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const { newBuisness } = React.useContext(NewBuisnessContext);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery('businesses', () => handleGetRequest('/business'));

  const handleCreate = useMutation('businesses', () => handlePostRequest('business', newBuisness), {
    onSuccess: (res) => {
      queryClient.invalidateQueries('businesses');
      setOpen(false);
    },
  });

  const handleClickOpen = () => setOpen(true);
  useKeyPress('N', () => setOpen(true));

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack gap={1} height={'100%'}>
      <FilterBar>
        <SearchBar searchData={[]} setter={() => {}} />
        <Tooltip title="Shift + N" arrow>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add A New Buisness
          </Button>
        </Tooltip>
        <Dialog
          open={open}
          setOpen={setOpen}
          unShowButtons={true}
          title={'New Buisness'}
          description={'please select the option above'}
        >
          <AsyncSearch />
          <PageChoose />
          <CampaignChoose />
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleCreate.mutate()}>
            Create
          </Button>
        </Dialog>
      </FilterBar>
      <Box overflow={'auto'}>
        {data.map((Business: Buissness) => (
          <BuisnessCard
            id={Business._id}
            key={Business._id}
            expanded={expanded}
            handleChange={handleChange}
            photo={Business.page.picture}
            name={Business.page.name}
            campaign={Business.campaign.name}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default BuisnessesPage;
