import React, { useState } from "react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Pune",
      "Delhi",
      "Mumbai",
      "Kolkata",
      "Jaipur",
      "Lucknow",
      "Chandigarh",
      "Ahmedabad",
      "Surat",
      "Indore",
      "Nagpur",
      "Bhopal",
      "Coimbatore",
      "Kochi",
      "Visakhapatnam",
      "Patna",
      "Vadodara",
      "Ludhiana",
      "Agra",
      "Nashik",
      "Rajkot",
      "Jabalpur",
      "Madurai",
      "Jodhpur",
      "Guwahati",
      "Dehradun",
      "Amritsar",
      "Rourkela",
      "Varanasi",
      "Durgapur",
      "Gwalior",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "IT",
      "Finance",
      "Healthcare",
      "Education",
      "Manufacturing",
      "Retail",
      "Transportation",
      "Energy",
      "Telecommunications",
      "Real Estate",
      "Hospitality",
      "Entertainment",
      "Agriculture",
      "Government",
    ],
  },
  {
    filterType: "Salary Range",
    array: [
      "₹0 - ₹50,000",
      "₹50,000 - ₹1,00,000",
      "₹1,00,000 - ₹1,50,000",
      "₹1,50,000+",
    ],
  },
  {
    filterType: "Experience",
    array: [
      "1 Year",
      "2 Years",
      "3 Years",
      "4 Years",
      "5 Years",
      "6 Years",
      "7 Years",
      "8 Years",
      "9 Years",
      "10+ Years",
    ],
  },
];

function Filtercard() {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Industry: "",
    "Salary Range": "",
    Experience: "",
  });

  const handleChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border p-5">
      <h1 className="text-xl font-bold">Filter Jobs</h1>

      <hr className="my-4" />

      {filterData.map((filter, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">
            {filter.filterType}
          </h2>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filter.array.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`${filter.filterType}-${idx}`}
                  name={filter.filterType}
                  value={option}
                  checked={selectedFilters[filter.filterType] === option}
                  onChange={(e) =>
                    handleChange(filter.filterType, e.target.value)
                  }
                  className="h-4 w-4 accent-blue-600 cursor-pointer"
                />

                <label
                  htmlFor={`${filter.filterType}-${idx}`}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <hr className="my-4" />

      <div className="bg-gray-100 rounded-md p-4">
        <h2 className="font-bold mb-3">Selected Filters</h2>

        <p>
          <span className="font-semibold">Location:</span>{" "}
          {selectedFilters.Location || "Not Selected"}
        </p>

        <p>
          <span className="font-semibold">Industry:</span>{" "}
          {selectedFilters.Industry || "Not Selected"}
        </p>

        <p>
          <span className="font-semibold">Salary Range:</span>{" "}
          {selectedFilters["Salary Range"] || "Not Selected"}
        </p>

        <p>
          <span className="font-semibold">Experience:</span>{" "}
          {selectedFilters.Experience || "Not Selected"}
        </p>
      </div>
    </div>
  );
}

export default Filtercard;