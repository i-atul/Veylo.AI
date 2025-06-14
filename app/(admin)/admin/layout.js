import React from 'react'
import { getAdmin } from '@/actions/admin';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import { Sidebar } from './_components/sidebar';

const AdminLayout = async ({children}) => {
    const admin = await getAdmin();

    if(!admin.authorized){
        return notFound();
    }
  return <div className='h-full'>
    <Header isAdminPage={true} />
    <div className='flex h-full w-56 flex-col top-20 fixed insert-y-0 z-50'>
        <Sidebar />
    </div>
    <main className='md:pl-56 pt-[80px] h-full'>{children}</main>
  </div>
  
};

export default AdminLayout