"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { cancelTestDrive } from "@/actions/test-drive";
import { TestDriveCard } from "@/components/test-drive-card";

export function ReservationsList({ initialData }) {
  const {
    loading: cancelling,
    fn: cancelBookingFn,
    error: cancelError,
  } = useFetch(cancelTestDrive);

  const handleCancelBooking = async (bookingId) => {
    await cancelBookingFn(bookingId);
  };

  // Group bookings by status
  const upcomingBookings = initialData?.data?.filter((booking) =>
    ["PENDING", "CONFIRMED"].includes(booking.status)
  );

  const pastBookings = initialData?.data?.filter((booking) =>
    ["COMPLETED", "CANCELLED", "NO_SHOW"].includes(booking.status)
  );

  // No reservations
  if (initialData?.data?.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-cyan-200 rounded-2xl bg-gradient-to-br from-[#e3f2fd] to-[#f1f8e9] shadow-md">
        <div className="bg-cyan-100 p-5 rounded-full mb-5 shadow">
          <Calendar className="h-10 w-10 text-cyan-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-cyan-800">
          No Reservations Yet
        </h3>
        <p className="text-gray-600 mb-8 max-w-md text-base">
          You haven’t booked any test drives yet. Discover your next car and
          schedule a test drive to experience it in person.
        </p>
        <Button
          variant="default"
          asChild
          className="bg-gradient-to-r from-[#2af598] to-[#009efd] text-white font-bold px-6 py-3 rounded-full text-lg shadow hover:from-gray-900 hover:to-gray-700 transition"
        >
          <Link href="/cars">Explore Cars</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-extrabold mb-6 text-black/50">
          Upcoming Test Drives
        </h2>
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500 italic">No upcoming test drives.</p>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <TestDriveCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelBooking}
                isCancelling={cancelling}
                showActions
                cancelError={cancelError}
                viewMode="list"
              />
            ))}
          </div>
        )}
      </div>

      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-3xl font-extrabold mb-6 text-cyan-800">
            Past Test Drives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastBookings.map((booking) => (
              <TestDriveCard
                key={booking.id}
                booking={booking}
                showActions={false}
                isPast
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}