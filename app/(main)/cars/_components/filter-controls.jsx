"use client";

export const CarFilterControls = ({
  filters,
  currentFilters,
  onFilterChange,
  onClearFilter,
}) => {
  const { make, bodyType, fuelType, transmission, priceRange } = currentFilters;

  const filterSections = [
    {
      id: "make",
      title: "Make",
      options: filters.makes.map((make) => ({ value: make, label: make })),
      currentValue: make,
      onChange: (value) => onFilterChange("make", value),
    },
    {
      id: "bodyType",
      title: "Body Type",
      options: filters.bodyTypes.map((type) => ({ value: type, label: type })),
      currentValue: bodyType,
      onChange: (value) => onFilterChange("bodyType", value),
    },
    {
      id: "fuelType",
      title: "Fuel Type",
      options: filters.fuelTypes.map((type) => ({ value: type, label: type })),
      currentValue: fuelType,
      onChange: (value) => onFilterChange("fuelType", value),
    },
    {
      id: "transmission",
      title: "Transmission",
      options: filters.transmissions.map((type) => ({
        value: type,
        label: type,
      })),
      currentValue: transmission,
      onChange: (value) => onFilterChange("transmission", value),
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 items-end w-full">
      {/* Price Range */}
      <div className="flex flex-col min-w-[220px] max-w-[260px] flex-1">
        <label className="text-xs font-medium mb-1 text-gray-700">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={filters.priceRange.min}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) =>
              onFilterChange("priceRange", [
                Number(e.target.value),
                priceRange[1],
              ])
            }
            className="w-20 border rounded px-2 py-1 text-sm"
          />
          <span className="text-gray-500 text-xs">to</span>
          <input
            type="number"
            min={priceRange[0]}
            max={filters.priceRange.max}
            value={priceRange[1]}
            onChange={(e) =>
              onFilterChange("priceRange", [
                priceRange[0],
                Number(e.target.value),
              ])
            }
            className="w-20 border rounded px-2 py-1 text-sm"
          />
          <span className="text-gray-500 text-xs">INR</span>
        </div>
      </div>
      {/* Filter Categories */}
      {filterSections.map((section) => (
        <div key={section.id} className="flex flex-col min-w-[160px]">
          <label className="text-xs font-medium mb-1 text-gray-700">
            {section.title}
          </label>
          <select
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={section.currentValue}
            onChange={(e) => section.onChange(e.target.value)}
          >
            <option value="">All</option>
            {section.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex flex-col gap-2 min-w-[120px]">
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-4 py-2 text-sm font-medium border border-gray-200"
          onClick={() => {
            filterSections.forEach((section) => onClearFilter(section.id));
            onFilterChange("priceRange", [
              filters.priceRange.min,
              filters.priceRange.max,
            ]);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};