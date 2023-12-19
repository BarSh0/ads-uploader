import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Box, Button, LinearProgress, Stack, TextField } from '@mui/material';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { animated, useSpring } from 'react-spring';
import { handlePostRequest } from '../../utils/api/axios';
import GoogleDrivePickerBtn from '../GoogleDrivePickerBtn';

type AdCardProps = { removeAd: (adId: string) => void; adId: string; businessId: string };

type AdData = {
  adName?: string;
  adHeadline?: string;
  adMedia?: string;
  adCopy?: string;
  adURL?: string;
  adUTM?: string;
};

const AdCard = ({ removeAd, adId, businessId }: AdCardProps) => {
  const [adData, setAdData] = React.useState<AdData>({});
  const [completed, setCompleted] = React.useState(false);
  const queryClient = useQueryClient();

  const handlePost = useMutation('ads', () => handlePostRequest(`facebook/${businessId}/ads`, { adData }), {
    onSuccess: (res) => {
      queryClient.invalidateQueries('ads');
      if (res.status === 200) setCompleted(true);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdData({ ...adData, [event.target.id]: event.target.value });
  };

  const handleMedia = (media: string) => {
    setAdData({ ...adData, adMedia: media });
  };

  const fadeInAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  if (completed) return <Alert severity="success">Done !</Alert>;

  if (handlePost.isLoading)
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress sx={{ height: '3rem', borderRadius: '0.2rem' }} />
      </Box>
    );

  return (
    <animated.div
      style={{
        ...fadeInAnimation,
        display: 'grid',
        gridTemplateColumns: '3fr 3fr 4fr 2fr 1fr',
        gap: '.5rem',
      }}
    >
      <Stack flexDirection={'column'} justifyContent={'space-between'}>
        <TextField id="adName" label="Ad Name" variant="outlined" onChange={handleChange} />
        <TextField
          id="adHeadline"
          inputProps={{ maxLength: 25 }}
          label="Ad Headline"
          variant="outlined"
          onChange={handleChange}
        />
      </Stack>
      <TextField
        id="adCopy"
        inputProps={{ maxLength: 90 }}
        multiline
        minRows={4}
        label="Ad Copy"
        variant="outlined"
        onChange={handleChange}
      />
      <Stack justifyContent={'space-between'}>
        <TextField id="adURL" label="URL" variant="outlined" onChange={handleChange} />
        <TextField id="adUTM" label="UTM" variant="outlined" onChange={handleChange} />
      </Stack>
      <GoogleDrivePickerBtn handleChange={handleMedia} />
      <Stack justifyContent={'space-between'}>
        <Button variant="outlined" color="success" startIcon={<AddIcon />} onClick={() => handlePost.mutateAsync()}>
          Post
        </Button>
        <Button variant="outlined" color="info" startIcon={<AccessTimeIcon />}>
          Timed
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => removeAd(adId)}>
          Delete
        </Button>
      </Stack>
    </animated.div>
  );
};

export default AdCard;
