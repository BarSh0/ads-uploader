import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import useDrivePicker from 'react-google-drive-picker';

function GoogleDrivePickerBtn({ handleChange }: { handleChange: Function }) {
  const [openPicker] = useDrivePicker();
  const [imgUrl, setImgUrl] = useState('');

  const handleOpenPicker = () => {
    openPicker({
      clientId: '803186167565-nq84ebaomet1nvbrpmh1tivpr7r3dbkc.apps.googleusercontent.com',
      developerKey: 'AIzaSyBWq9G_GECrDm1X9b1rXOeEM2W9mCBS0Mk',
      viewId: 'DOCS',
      supportDrives: true,
      multiselect: false,
      viewMimeTypes: 'image/png,image/jpeg,image/jpg',
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button');
        }
        if (data.action === 'picked') {
          const url = handleGetUrl(data.docs[0].embedUrl);
          handleChange(url);
          setImgUrl(url);
        }
      },
    });
  };

  const handleGetUrl = (url: string) => {
    const id = url.split('/')[5].split('?')[0];
    return `https://drive.google.com/uc?export=view&id=${id}`;
  };

  return (
    <Button variant="outlined" onClick={() => handleOpenPicker()}>
      {!imgUrl ? (
        <Stack alignItems={'center'}>
          <AddIcon />
          Photo/Video
        </Stack>
      ) : (
        <img src={imgUrl} alt="Selected" style={{ maxWidth: '6.5rem', maxHeight: '6.5rem' }} />
      )}
    </Button>
  );
}

export default GoogleDrivePickerBtn;
