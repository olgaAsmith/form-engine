import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, getItems } from '../../lib/userSlice';
import { RootState } from '../../lib/store';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { useEffect, useState, useCallback, useMemo } from 'react';
import ListItem from './ListItem';

export default function ListItems() {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.user.items);
  const { register, handleSubmit, reset } = useForm<{
    title: string;
    text: string;
  }>();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const onSubmit = (data: { title: string; text: string }) => {
    const newItem = {
      id: Date.now().toString(),
      title: data.title,
      text: data.text,
    };
    dispatch(addItem(newItem));
    reset();
  };

  const handleEditClick = useCallback((itemId: string) => {
    setEditingItemId(itemId);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingItemId(null);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteItem(id));
    },
    [dispatch]
  );

  const memoizedItems = useMemo(() => items, [items]);

  return (
    <div className='flex gap-12'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 mt-6 p-4 border border-white w-full md:w-1/2 max-h-96'
      >
        <h3 className='italic'>Добавить запись:</h3>
        <input
          type='text'
          className={`w-full p-2 border-2 rounded-md bg-transparent border-white outline-none`}
          {...register('title', { required: true })}
          placeholder='Заголовок'
        />
        <textarea
          className={`w-full h-[200px] p-2 border-2 rounded-md bg-transparent border-white outline-none`}
          {...register('text', { required: true })}
          placeholder='Запись'
        />
        <Button type='submit'>Создать запись</Button>
      </form>
      <div className='w-full'>
        <h3 className='text-xl mt-6'>Ваши записи:</h3>
        <ul className='w-full'>
          {memoizedItems.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              isEditing={editingItemId === item.id}
              onEdit={() => handleEditClick(item.id)}
              onDelete={() => handleDelete(item.id)}
              onCancelEdit={handleCancelEdit}
            ></ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
}
