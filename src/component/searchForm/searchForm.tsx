import React, { useState } from "react";

interface DropdownButtonProps {
  itemList: string[];
  title: string;
  onSelect: (itemList: string[]) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  itemList,
  title,
  onSelect,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="dropdown-button" onClick={() => setOpen(!open)}>
        {title}
      </div>
      {hover && (
        <div
          className="dropdown-content text-[15px] bg-[#dfdbd1] text-left 
        shadow-sm shadow-gray-500 p-[10px] pb-[15px] pt-[15px] rounded-sm"
        >
          {itemList.map((item, index) => (
            <div key={index} className="hover:text-[#5da4ac] ">
              <p onClick={() => onSelect([item])}>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
