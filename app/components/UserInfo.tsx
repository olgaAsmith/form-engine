'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { useRouter } from 'next/navigation';
import { getUserData } from '../../lib/userSlice';
import dynamic from 'next/dynamic';
import Button from './Button';

export default function UserInfo() {
  const [showItemsList, setShowItemsList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);

  const ListItems = dynamic(() => import('./ListItems'));

  useEffect(() => {
    dispatch(getUserData());
    setIsFetchingUser(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isFetchingUser) {
      if (!user) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isFetchingUser, router]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center p-12'>
        <p className='text-2xl'>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full p-6 bg-slate-800 rounded-md'>
      {user ? (
        <>
          <h2 className='text-2xl md:text-[44px] mt-6'>Добро Пожаловать, {user.name}</h2>
          <div>
            <p className='text-xl mt-8'>
              Ваше имя: <span className='font-bold'>{user.name}</span>
            </p>
            <p className='text-xl mt-1 mb-6'>
              Ваш email: <span className='font-bold'>{user.email}</span>
            </p>
            <Button
              type='button'
              onClick={() => setShowItemsList(!showItemsList)}
            >
              {showItemsList ? 'Спрятать записи' : 'Показать записи'}
            </Button>
            {showItemsList && <ListItems />}
          </div>
        </>
      ) : null}
    </div>
  );
}
