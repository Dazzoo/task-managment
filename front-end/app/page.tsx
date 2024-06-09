import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Page() {

  redirect('/register')

  return (
    <div className="flex h-screen bg-white">

    </div>
  );
}
