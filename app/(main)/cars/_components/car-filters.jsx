"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter, X, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { CarFilterControls } from "./filter-controls";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CarFilters = ({ filters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values from searchParams
  const currentMake = searchParams.get("make") || "";
  const currentBodyType = searchParams.get("bodyType") || "";
  const currentFuelType = searchParams.get("fuelType") || "";
  const currentTransmission = searchParams.get("transmission") || "";
  const currentMinPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice"))
    : filters.priceRange.min;
  const currentMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice"))
    : filters.priceRange.max;
  const currentSortBy = searchParams.get("sortBy") || "newest";

  // Local state for filters
  const [make, setMake] = useState(currentMake);
  const [bodyType, setBodyType] = useState(currentBodyType);
  const [fuelType, setFuelType] = useState(currentFuelType);
  const [transmission, setTransmission] = useState(currentTransmission);
  const [priceRange, setPriceRange] = useState([
    currentMinPrice,
    currentMaxPrice,
  ]);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Update local state when URL parameters change
  useEffect(() => {
    setMake(currentMake);
    setBodyType(currentBodyType);
    setFuelType(currentFuelType);
    setTransmission(currentTransmission);
    setPriceRange([currentMinPrice, currentMaxPrice]);
    setSortBy(currentSortBy);
  }, [
    currentMake,
    currentBodyType,
    currentFuelType,
    currentTransmission,
    currentMinPrice,
    currentMaxPrice,
    currentSortBy,
  ]);

  // Count active filters
  const activeFilterCount = [
    make,
    bodyType,
    fuelType,
    transmission,
    currentMinPrice > filters.priceRange.min ||
      currentMaxPrice < filters.priceRange.max,
  ].filter(Boolean).length;

  // Update URL when filters change
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (make) params.set("make", make);
    if (bodyType) params.set("bodyType", bodyType);
    if (fuelType) params.set("fuelType", fuelType);
    if (transmission) params.set("transmission", transmission);
    if (priceRange[0] > filters.priceRange.min)
      params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < filters.priceRange.max)
      params.set("maxPrice", priceRange[1].toString());
    if (sortBy !== "newest") params.set("sortBy", sortBy);

    // Preserve search and page params if they exist
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    if (search) params.set("search", search);
    if (page && page !== "1") params.set("page", page);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
    setIsSheetOpen(false);
  }, [
    make,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    sortBy,
    pathname,
    searchParams,
    filters.priceRange.min,
    filters.priceRange.max,
  ]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    switch (filterName) {
      case "make":
        setMake(value);
        break;
      case "bodyType":
        setBodyType(value);
        break;
      case "fuelType":
        setFuelType(value);
        break;
      case "transmission":
        setTransmission(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
    }
  };

  // Handle clearing specific filter
  const handleClearFilter = (filterName) => {
    handleFilterChange(filterName, "");
  };

  // Clear all filters
  const clearFilters = () => {
    setMake("");
    setBodyType("");
    setFuelType("");
    setTransmission("");
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    setSortBy("newest");

    // Keep search term if exists
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) params.set("search", search);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
    setIsSheetOpen(false);
  };

  // Current filters object for the controls component
  const currentFilters = {
    make,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    priceRangeMin: filters.priceRange.min,
    priceRangeMax: filters.priceRange.max,
  };

  // --- HORIZONTAL FILTER BAR ---
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Horizontal filter bar for desktop/tablet */}
      <div className="hidden lg:flex flex-wrap items-end gap-8 w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 px-6 py-4 mb-2 sticky top-4 z-30 transition-all">
        {/* Make */}
        <div className="flex flex-col min-w-[160px]">
          <label className="text-xs font-semibold mb-1 text-gray-700 tracking-wide">Make</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white transition-all shadow-sm hover:border-blue-300"
            value={make}
            onChange={e => handleFilterChange("make", e.target.value)}
          >
            <option value="">All</option>
            {filters.makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <span className="h-8 w-px bg-gray-200 mx-2" />
        {/* Body Type */}
        <div className="flex flex-col min-w-[160px]">
          <label className="text-xs font-semibold mb-1 text-gray-700 tracking-wide">Body Type</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white transition-all shadow-sm hover:border-blue-300"
            value={bodyType}
            onChange={e => handleFilterChange("bodyType", e.target.value)}
          >
            <option value="">All</option>
            {filters.bodyTypes.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <span className="h-8 w-px bg-gray-200 mx-2" />
        {/* Fuel Type */}
        <div className="flex flex-col min-w-[140px]">
          <label className="text-xs font-semibold mb-1 text-gray-700 tracking-wide">Fuel</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white transition-all shadow-sm hover:border-blue-300"
            value={fuelType}
            onChange={e => handleFilterChange("fuelType", e.target.value)}
          >
            <option value="">All</option>
            {filters.fuelTypes.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <span className="h-8 w-px bg-gray-200 mx-2" />
        {/* Transmission */}
        <div className="flex flex-col min-w-[140px]">
          <label className="text-xs font-semibold mb-1 text-gray-700 tracking-wide">Transmission</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white transition-all shadow-sm hover:border-blue-300"
            value={transmission}
            onChange={e => handleFilterChange("transmission", e.target.value)}
          >
            <option value="">All</option>
            {filters.transmissions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <span className="h-8 w-px bg-gray-200 mx-2" />
        {/* Price Range */}
        <div className="flex flex-col min-w-[220px] max-w-[260px] flex-1">
          <label className="text-xs font-semibold mb-1 text-gray-700 tracking-wide">Price Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={filters.priceRange.min}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={e => handleFilterChange("priceRange", [Number(e.target.value), priceRange[1]])}
              className="w-20 border border-gray-300 rounded-lg px-2 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-gray-500 text-xs">to</span>
            <input
              type="number"
              min={priceRange[0]}
              max={filters.priceRange.max}
              value={priceRange[1]}
              onChange={e => handleFilterChange("priceRange", [priceRange[0], Number(e.target.value)])}
              className="w-20 border border-gray-300 rounded-lg px-2 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-gray-500 text-xs font-medium">INR</span>
          </div>
        </div>
        <span className="h-8 w-px bg-gray-200 mx-2" />
        {/* Apply/Clear Buttons */}
        <div className="flex flex-col gap-2 min-w-[120px]">
          <button
            className="w-full cursor-pointer bg-gradient-to-r from-[#2af598] to-[#009efd] hover:from-gray-950 hover:to-gray-800 text-white font-semibold rounded-lg py-2 px-4 shadow transition-all"
            onClick={applyFilters}
          >
            Apply
          </button>
          <button
            className="w-full cursor-pointer bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg py-2 px-4 shadow-sm transition-all"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Mobile Filters (Sheet) */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:max-w-md overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>

              <div className="py-6">
                <CarFilterControls
                  filters={filters}
                  currentFilters={currentFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilter={handleClearFilter}
                />
              </div>

              <SheetFooter className="sm:justify-between flex-row pt-2 border-t space-x-4 mt-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="button" onClick={applyFilters} className="flex-1 text-shadow-white bg-gradient-to-r from-[#2af598] to-[#009efd] hover:from-gray-950 hover:to-gray-800">
                  Show Results
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
