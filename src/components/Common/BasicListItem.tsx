import { Avatar, Typography } from '@mui/material';
import React from 'react';
import colors from '../../style/colors';
import { StackListItem } from './styles';

export type ListItemProps = {
  name: string;
  icon?: string;
  data?: any;
  isSelected?: boolean;
  select?: Function;
  unSelect?: Function;
};

const ListItem = ({ name, icon, data, isSelected, select, unSelect }: ListItemProps) => {
  const handleOnClick = () => {
    if (isSelected) {
      unSelect && unSelect(data);
    } else {
      select && select(data);
    }
  };

  return (
    <StackListItem
      flexDirection={'row'}
      sx={{ background: isSelected ? colors.green : '#ffffff' }}
      onClick={handleOnClick}
    >
      <Avatar variant="rounded" src={icon} alt={name} sx={{ width: 30, height: 30 }} />
      <Typography>{name}</Typography>
    </StackListItem>
  );
};

export default ListItem;
