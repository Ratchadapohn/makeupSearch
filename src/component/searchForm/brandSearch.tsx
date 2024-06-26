import React, { useState, useEffect } from "react";

interface MakeupItem {
  priceInTHB: number;
  name: string;
  brand: string;
  price: string;
  api_featured_image: string;
  description: string;
  website_link: string;
  product_type: string;
  category: string;
}
interface SearchFormProps {
  options: string[];
  makeupData: MakeupItem[];
  onSearchResult: (results: MakeupItem[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  makeupData,
  onSearchResult,
}) => {
  const [query, setQuery] = useState<string>("");
  const [brandOptions, setBrandOptions] = useState<string[]>([]);

  useEffect(() => {
    const uniqueBrands = Array.from(
      new Set(makeupData.map((item) => item.brand))
    );
    setBrandOptions(uniqueBrands);
  }, [makeupData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setQuery(selectedValue);
    const filteredData = makeupData.filter(
      (item) => item.brand === selectedValue
    );
    onSearchResult(filteredData);
  };

  return (
    <div>
      <select
        className="bg-[#E6F2FF] pl-[10px] pr-[10px] p-[3px] 
         translate-y-[-4px] rounded-md shadow-sm shadow-gray-300"
        value={query}
        onChange={handleSelectChange}
      >
        <option value="">shop by brand ...</option>
        {brandOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchForm;
