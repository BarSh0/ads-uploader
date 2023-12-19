import { Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { IAutomation } from '../../constants/types/automation.types';
import { handleDeleteRequest } from '../../utils/api/axios';

const DeleteAutomationBtn = (automation: IAutomation) => {
  const queryClient = useQueryClient();

  const handleDelete = useMutation(() => handleDeleteRequest(`/${automation.platform}/${automation._id}`), {
    onSuccess: (res) => {
      queryClient.invalidateQueries('automations');
    },
  });

  return (
    <Button variant="contained" color="error" onClick={() => handleDelete.mutate()}>
      Delete
    </Button>
  );
};

export default DeleteAutomationBtn;
