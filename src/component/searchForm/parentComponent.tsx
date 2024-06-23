import React, { useState, useEffect } from "react";
import DropdownButton from "./searchForm";

const ParentComponent: React.FC = () => {
  const [makeupData, setMakeupData] = useState<{ name: string }[]>([]);

  // Fetch makeup data on component mount
  useEffect(() => {
    // Your fetch logic to set makeupData
    // Example:
    const fetchedMakeupData = [
      { name: "lipstick" },
      { name: "eyeliner" },
      { name: "foundation" },
    ];
    setMakeupData(fetchedMakeupData);
  }, []);

  const handleDropdown = (selectedItems: string[]) => {
    // Handle the filtering logic here
    console.log("Selected items:", selectedItems);
    // Perform filtering based on selected items and update the makeupData state
  };

  return (
    <div>
      <DropdownButton
        itemList={["lipstick", "eyeliner", "foundation"]} // Example item list
        title="Makeup"
        onSelect={(selectedItems: any) =>
          console.log("Selected items:", selectedItems)
        } // Example onSelect function
        makeupData={makeupData} // Pass makeupData to DropdownButton
        handleDropdown={handleDropdown} // Pass handleDropdown function to DropdownButton
      />
    </div>
  );
};

export default ParentComponent;
