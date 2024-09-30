'use client';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../lib/userSlice';

interface FormRegisterProps {
  username: string;
  email: string;
  password: string;
}

export default function FormRegister() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterProps>();

  const onSubmit = (data: FormRegisterProps) => {
    sessionStorage.setItem('userData', JSON.stringify(data));
    dispatch(setUserData({ name: data.username, email: data.email }));
    router.push('/profile');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-8 w-full max-w-md p-6 bg-slate-800 rounded-md'
      noValidate
    >
      <div className='relative'>
        <label htmlFor='username' className='block mb-1'>
          Ваше имя
        </label>
        <input
          id='username'
          type='text'
          placeholder='Джон Смит'
          {...register('username', { required: 'Введите Ваше Имя' })}
          className={`w-full p-2 border-2 rounded-md bg-transparent ${
            errors.username ? 'border-pink-700' : 'border-white'
          } outline-none`}
        />
        {errors.username && (
          <p className='absolute bottom-[-20px] left-0 text-pink-700 text-[10px]'>
            {errors.username.message}
          </p>
        )}
      </div>
      <div className='relative'>
        <label htmlFor='email' className='block mb-1'>
          Ваш Email
        </label>
        <input
          id='email'
          type='email'
          placeholder='mail@mail.ru'
          {...register('email', {
            required: 'Введите Email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Некорректный Email',
            },
          })}
          className={`w-full p-2 border-2 rounded-md bg-transparent ${
            errors.email ? 'border-pink-700' : 'border-white'
          } outline-none`}
        />
        {errors.email && (
          <p className='absolute bottom-[-20px] left-0 text-pink-700 text-[10px]'>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className='relative'>
        <label htmlFor='password' className='block mb-1'>
          Пароль
        </label>
        <input
          id='password'
          type='password'
          placeholder='******'
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 6,
              message: 'Минимально 6 символов',
            },
          })}
          className={`w-full p-2 border-2 rounded-md bg-transparent ${
            errors.password ? 'border-pink-700' : 'border-white'
          } outline-none`}
        />
        {errors.password && (
          <p className='absolute bottom-[-20px] left-0 text-pink-700 text-[10px]'>
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type='submit'>Зарегистрироваться</Button>
    </form>
  );
}
