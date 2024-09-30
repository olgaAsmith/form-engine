'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { getUserData, logout } from '../../lib/userSlice';
import Button from './Button';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    dispatch(getUserData());
    setIsLoading(false);
  }, [dispatch]);

  const handleRedirect = () => {
    router.push('/register');
  };

  const handleRedirectToProfile = () => {
    router.push('/profile');
  };

  const handleRedirectToMain = () => {
    router.push('/');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    dispatch(logout());
    router.push('/');
  };

  const getInitials = (name: string | null) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className='h-[100px] bg-black flex items-center justify-end p-4'>
      {isLoading ? null : user && user.name ? (
        <div className='w-full flex'>
          {pathname === '/' ? null : (
            <Button type='button' onClick={handleRedirectToMain}>
              На главную
            </Button>
          )}
          <div className='flex gap-4 items-center ml-auto'>
            <button
              className='bg-gray-700 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 transition'
              onClick={handleRedirectToProfile}
            >
              {getInitials(user.name)}
            </button>
            <Button type='button' onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex gap-6'>
        {pathname === '/' ? null : (
          <Button type='button' onClick={handleRedirectToMain}>
            На главную
          </Button>
        )}
        <Button type='button' onClick={handleRedirect}>
          Регистрация
        </Button>
        </div>
      )}
    </header>
  );
}
