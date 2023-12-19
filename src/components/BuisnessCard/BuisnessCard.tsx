import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { random } from 'lodash';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { handleDeleteRequest } from '../../utils/api/axios';
import { StyledAvatar } from '../AutomationComponents/styles';
import AdCard from './AdCard';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

type BuisnessCardProps = {
  expanded: boolean | string;
  id: string;
  handleChange: Function;
  photo: string;
  name: string;
  campaign: string;
};

const BuisnessCard = ({ expanded, handleChange, photo, name, campaign, id }: BuisnessCardProps) => {
  const [adsArray, setAdsArray] = React.useState([{ id: React.useId() }]);

  const queryClient = useQueryClient();

  const handleDelete = useMutation('businesses', () => handleDeleteRequest(`/business/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('businesses');
    },
  });

  const addAd = () => {
    setAdsArray([...adsArray, { id: random(1, 100).toString() }]);
  };

  const removeAd = (id: string) => {
    setAdsArray(adsArray.filter((ad) => ad.id !== id));
  };

  return (
    <Accordion
      expanded={expanded === `panel${id}`}
      onChange={handleChange(`panel${id}`)}
      sx={{ borderRadius: '.5rem' }}
    >
      <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
        <Stack flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1} padding={'0 1rem'}>
            <StyledAvatar variant="rounded" src={photo} />
            <Typography>{name}</Typography>
            <KeyboardDoubleArrowRightIcon color="success" />
            <Typography>{campaign}</Typography>
          </Stack>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <IconButton onClick={() => handleDelete.mutate()}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        {adsArray.map((ad, index) => (
          <React.Fragment key={index}>
            <AdCard removeAd={removeAd} adId={ad.id} businessId={id} />
            {index < adsArray.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        <Button variant="outlined" color="primary" onClick={addAd}>
          <AddIcon />
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default BuisnessCard;
