import { useForm } from 'react-hook-form';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { editItem } from '../../lib/userSlice';

interface EditItemFormProps {
  item: { id: string; title: string; text: string };
  onCancel: () => void;
}

export default function FormEdit({ item, onCancel }: EditItemFormProps) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<{
    title: string;
    text: string;
  }>();

  const onSubmit = (data: { title: string; text: string }) => {
    dispatch(editItem({ id: item.id, title: data.title, text: data.text }));
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <input
        type='text'
        className={`w-full p-2 border-2 rounded-md bg-transparent border-white outline-none`}
        {...register('title', { required: true })}
        placeholder='Заголовок'
        defaultValue={item.title}
      />
      <textarea
        className={`w-full h-[100px] p-2 border-2 rounded-md bg-transparent border-white outline-none`}
        {...register('text', { required: true })}
        placeholder='Запись'
        defaultValue={item.text}
      />
      <div className='flex justify-end gap-4'>
        <Button type='button' onClick={onCancel}>
          Отмена
        </Button>
        <Button type='submit'>Сохранить изменения</Button>
      </div>
    </form>
  );
}
