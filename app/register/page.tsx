import FormRegister from '../components/FormRegister';

export default function Register() {
  return (
    <section>
      <div className='flex items-center w-full justify-center flex-col p-4 md:w-5/4'>
        <h1 className='text-2xl mb-4'>Страница регистрации</h1>
        <FormRegister></FormRegister>
      </div>
    </section>
  );
}
