import { CarFilters } from "./_components/car-filters";
import { getCarFilters } from "@/actions/car-listing";
import { CarListings } from "./_components/car-listing";

export const metadata ={
    title: "Veylo | Cars",
    description: "Explore our range of cars available",
}

export default async function CarsPage() {
  const filtersData = await getCarFilters();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-4 gradient-title">Explore Cars</h1>

      <div className="mb-8">
        <CarFilters filters={filtersData.data} />
      </div>

      <CarListings />
    </div>
  );
}