import React, { memo } from 'react';
import Button from './Button';
import FormEdit from './FormEdit';

interface ListItemProps {
  item: { id: string; title: string; text: string };
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCancelEdit: () => void;
}

const ListItem = memo(function ListItem({
  item,
  isEditing,
  onEdit,
  onDelete,
  onCancelEdit,
}: ListItemProps) {
  return (
    <li className='w-full flex flex-col gap-6 mt-6 p-4 border border-white'>
      {isEditing ? (
        <FormEdit item={item} onCancel={onCancelEdit} />
      ) : (
        <>
          <h3 className='font-bold text-xl'>{item.title}</h3>
          <p className='italic text-sm'>{item.text}</p>
          <div className='flex gap-6 flex-col md:flex-row'>
            <Button type='button' onClick={onEdit}>
              Редактировать
            </Button>
            <Button type='button' onClick={onDelete}>
              Удалить
            </Button>
          </div>
        </>
      )}
    </li>
  );
});

export default ListItem;
