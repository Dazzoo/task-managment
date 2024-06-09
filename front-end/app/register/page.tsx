import Link from 'next/link';
// import { createUser, getUser } from 'app/db';
import { fetchRegister } from '@/lib/routes/auth';
import { RegisterForm } from '@/components/auth/register/RegisterForm';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../submit-button';

export default function Register() {

  async function register(formData: FormData) {
    'use server';
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let username = formData.get('name') as string;
    let res = await fetchRegister(email, password, username)

    if (res.status?.toString().startsWith('2')) {
      redirect('/dashboard')
    } else {
      console.log('Something went wrong!')
    }

    // if (user.length > 0) {
    //   return 'User already exists'; // TODO: Handle errors with useFormStatus
    // } else {
    //   // await createUser(email, password);
    //   redirect('/login');
    // }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <RegisterForm action={register}>
        <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
        </RegisterForm>
      </div>
    </div>
  );
}
