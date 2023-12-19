import { Stack } from '@mui/material';
import { useContext } from 'react';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import { StackList } from '../AutomationComponents/styles';
import ListItem, { ListItemProps } from './BasicListItem';
import { BasicListLabel } from './styles';

type BasicListProps = {
  title: string;
  label?: string;
  items: Array<ListItemProps> | null;
  children?: any;
  isMultySelect?: boolean;
};

const BasicList = ({ title, label, items, isMultySelect, children }: BasicListProps) => {
  const { newAutomation, insertValue, removeValue, insertMultipleValues, removeMultipleValues } =
    useContext(NewAutomationContext);

  const handleOnSelect = (name: string) => {
    insertValue(label!, name);
  };

  const handleOnUnSelect = (name: string) => {
    removeValue(label!, name);
  };

  const handleOnMultySelect = (data: any) => {
    insertMultipleValues(label!, data);
  };
  const handleOnMultyUnSelect = (data: any) => {
    removeMultipleValues(label!, data);
  };

  return (
    <Stack gap={2}>
      <BasicListLabel>{title}</BasicListLabel>
      <StackList justifyContent={items && items.length > 5 ? 'flex-start' : 'center'}>
        {items?.map((item, index) => {
          return (
            <ListItem
              key={item.name + index}
              name={item.name}
              icon={item.icon}
              isSelected={label && newAutomation[label] === item.name ? true : false}
              select={isMultySelect ? handleOnMultySelect : handleOnSelect}
              unSelect={isMultySelect ? handleOnMultyUnSelect : handleOnUnSelect}
            />
          );
        })}
        {children}
      </StackList>
    </Stack>
  );
};

export default BasicList;
