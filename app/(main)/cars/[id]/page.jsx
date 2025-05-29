import { getCarById } from "@/actions/car-listing";
import { notFound } from "next/navigation";
import CarDetails from "./_components/car-details";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getCarById(id);

  if (!result.success) {
    return {
      title: "Car Not Found | Veylo",
      description: "The requested car could not be found",
    };
  }

  const car = result.data;

  return {
    title: `${car.year} ${car.make} ${car.model} | Veylo`,
    description: car.description.substring(0, 160),
    openGraph: {
      images: car.images?.[0] ? [car.images[0]] : [],
    },
  };
}

const CarPage = async ({ params }) => {
  const { id } = await params;
  const result = await getCarById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div>
    <CarDetails car={result.data} testDriveInfo={result.data.testDriveInfo} />
    </div>
  )
  
}

export default CarPage;