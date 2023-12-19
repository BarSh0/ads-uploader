import { Avatar, Stack, Typography } from '@mui/material';
import { DisableStackListItem, StackListItem } from './styles';

export type ListItemProps = {
  name: string;
  icon?: string;
  value?: any;
  isSelected?: boolean;
  isDisabled?: boolean;
  select?: Function;
  unSelect?: Function;
  rightComponent?: any;
};

const ListItem = ({ name, icon, value, isSelected, select, unSelect, isDisabled, rightComponent }: ListItemProps) => {
  const handleOnClick = () => {
    if (isSelected) {
      unSelect && unSelect(value);
    } else {
      select && select(value);
    }
  };
  if (isDisabled)
    return (
      <DisableStackListItem flexDirection={'row'} justifyContent={'space-between'}>
        <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
          <Avatar variant="rounded" src={icon} alt={name} sx={{ width: 30, height: 30 }} />
          <Typography>{name}</Typography>
        </Stack>
        {rightComponent}
      </DisableStackListItem>
    );

  return (
    <StackListItem
      flexDirection={'row'}
      justifyContent={'space-between'}
      sx={{ outlineColor: isSelected ? '#1ecf2d' : '#ffffff', outlineWidth: 2, outlineStyle: 'solid' }}
      onClick={handleOnClick}
    >
      <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
        <Avatar variant="rounded" src={icon} alt={name} sx={{ width: 30, height: 30 }} />
        <Typography>{name || 'No Name'}</Typography>
      </Stack>
      {rightComponent}
    </StackListItem>
  );
};

export default ListItem;
