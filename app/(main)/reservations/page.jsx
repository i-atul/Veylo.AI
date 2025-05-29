import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReservationsList } from "./_components/reservations-list";
import { getUserTestDrives } from '@/actions/test-drive';

export const metadata = {
  title: "Veylo | My Reservations",
  description: "Manage your reservations on Veylo",
};


export default async function ReservationsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect=/reservations");
  }

  const reservationsResult = await getUserTestDrives();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 gradient-title">My Reservations</h1>
      <ReservationsList initialData={reservationsResult} />
    </div>
  );
}