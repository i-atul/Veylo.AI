import React from 'react'
import CarsList from './_components/car-list'

export const metadata ={
    title: "Veylo | Admin Cars",
    description: "Manage Cars in Veylo Admin Dashboard",
}

const CarsPage = () => {
  return (
    <div className='p-6'>
        <h1 className='text-2xl font-bold mb-6'>Listings Cars</h1>
        <CarsList />
    </div>
  )
}

export default CarsPage