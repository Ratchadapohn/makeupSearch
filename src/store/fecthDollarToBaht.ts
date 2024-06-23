export const fetchCurrencyConversion = async (): Promise<number> => {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );
  const data = await response.json();
  const usdToThbRate: number = data.rates.THB;
  return usdToThbRate;
};

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import SearchForm from "./component/searchForm/brandSearch";
// import DropdownButton from "./component/searchForm/searchForm";
// import { FetchData } from "./store/axios";
// import { eyeList, mouthList, faceList, eyebrowList } from "./utils/optionList";

// import { VscAccount, VscGift } from "react-icons/vsc";
// import ReactLoading from "react-loading";
// import { FcCursor, FcLikePlaceholder, FcSearch } from "react-icons/fc";
// import { fetchCurrencyConversion } from "./store/fecthDollarToBaht";

// interface MakeupItem {
//   priceInTHB: number;
//   name: string;
//   brand: string;
//   price: string;
//   api_featured_image: string;
//   description: string;
//   website_link: string;
//   product_type: string;
// }

// const App: React.FC = () => {
//   const [currentDateTime, setCurrentDateTime] = useState<string>("");
//   const [makeupData, setMakeupData] = useState<MakeupItem[]>([]);
//   const [filteredMakeupData, setFilteredMakeupData] = useState<MakeupItem[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [usdToThbRate, setUsdToThbRate] = useState<number | null>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const hour = String(now.getHours()).padStart(2, "0");
//       const minutes = String(now.getMinutes()).padStart(2, "0");
//       setCurrentDateTime(`${hour}:${minutes}`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true); // Set isLoading to true before fetching data
//       const data: MakeupItem[] | null = await FetchData();
//       if (data) {
//         setMakeupData(data);
//         setFilteredMakeupData(data);
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
//   useEffect(() => {
//     const convertPriceToTHB = async () => {
//       if (!usdToThbRate) {
//         const rate = await fetchCurrencyConversion();
//         setUsdToThbRate(rate);
//       }
//     };
//     convertPriceToTHB();
//   }, [usdToThbRate]);

//   const handleSearchResult = (results: MakeupItem[]) => {
//     if (usdToThbRate && results.length > 0) {
//       const updatedResults = results.map((item) => {
//         const priceInTHB = parseFloat(item.price) * usdToThbRate;
//         return {
//           ...item,
//           priceInTHB: isNaN(priceInTHB) ? null : priceInTHB,
//         };
//       });
//       setFilteredMakeupData(updatedResults);
//     } else {
//       // กรณี usdToThbRate มีค่าเป็น null หรือ results ไม่มีข้อมูล
//       setFilteredMakeupData(results);
//     }
//   };

//   const handleDropdown = (itemList: string[]) => {
//     if (usdToThbRate) {
//       const filteredData =
//         itemList.length === 0
//           ? makeupData
//           : makeupData.filter((item) => itemList.includes(item.product_type));

//       const updatedData = filteredData.map((item) => {
//         const priceInTHB = parseFloat(item.price) * usdToThbRate;
//         return {
//           ...item,
//           priceInTHB: isNaN(priceInTHB) ? null : priceInTHB,
//         };
//       });

//       setFilteredMakeupData(updatedData);
//     } else {
//       // กรณี usdToThbRate มีค่าเป็น null
//       setFilteredMakeupData([]);
//     }
//   };

//   return (
//     <div>
//       <div className="">
//         <div>
//           <div className="bg-[#b78e51] text-white text-[12px]">
//             <span>{currentDateTime}</span>
//           </div>

//           <div className=" bg-white h-[45px] flex justify-around pt-[12px] font-extrabold text-[15px] font-serif text-[#926065] ">
//             <div className="text-[25px] pl-[90px] font-[20px] text-bold ">
//               Beauty
//             </div>
//             <div className="flex gap-[25px]">
//               <div className="">
//                 <DropdownButton
//                   onSelect={handleDropdown}
//                   title="Eyes"
//                   itemList={eyeList}
//                 />
//               </div>
//               <div>
//                 <DropdownButton
//                   onSelect={handleDropdown}
//                   title="Mouth"
//                   itemList={mouthList}
//                 />
//               </div>
//               <div>
//                 <DropdownButton
//                   onSelect={handleDropdown}
//                   title="Face"
//                   itemList={faceList}
//                 />
//               </div>
//               <div>
//                 <DropdownButton
//                   onSelect={handleDropdown}
//                   title="Eyebrows"
//                   itemList={eyebrowList}
//                 />
//               </div>
//               <div>
//                 <SearchForm
//                   options={makeupData.map((item) => item.brand)}
//                   makeupData={makeupData}
//                   onSearchResult={handleSearchResult}
//                   className="w-[40px] bg-black"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-[10px] text-[20px] pr-[40px] font-black">
//               <div>
//                 <VscGift />
//               </div>
//               <div className="text-[18px]">
//                 <VscAccount />
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#9fd1e1] position h-[160px]">
//             {/* <h1 className="font-opificio"> Beauty cosmetics</h1> */}

//             <div className="flex justify-center relative pt-[60px] pb-[20px] ">
//               <img
//                 className="h-[210px] translate-y-[-80px] translate-x-[-170px] w-[270px]"
//                 src="/7.png"
//                 alt="makeup"
//               />
//               <div
//                 className="bg-[#9fd1e1] text-white flex justify-between rounded-md h-[35px] w-[500px]
//               shadow-sm shadow-[#816d4e]"
//               >
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="bg-white text-[#b78e51]  rounded-l-md pl-[70px] w-[500px] "
//                   // value={searchTerm}
//                   // onChange={handleChange}
//                 />
//                 <div className="text-white font-extrabold rounded-r-md pl-[30px] pr-[30px] bg-[#b78e51] text-[25px] pt-[5px]">
//                   <FcSearch />
//                 </div>
//               </div>
//             </div>
//             {isLoading && (
//               <div className="grid justify-center text-[50px] ">
//                 <ReactLoading type="cubes" color="gray" />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="position">
//           <div
//             className="grid grid-cols-3  gap-[25px] justify-center
//         bg-[#f1f0ee] overflow-auto h-[500px] w-[1200px] p-[20px] pl-[80px] pr-[30px]  "
//           >
//             {filteredMakeupData && filteredMakeupData.length > 0 ? (
//               filteredMakeupData.map((item: MakeupItem, index: number) => (
//                 <div key={index} className="p-[30px] w-[270px] h-[370px]">
//                   <div className="p-[8px] grid  pt-[20px] gap-[20px] h-[240px] bg-[#eadfc7]  shadow-sm shadow-[#b9a383] w-[270px]">
//                     <div className="grid justify-center w-[270px] ">
//                       <div className=" w-[150px] pb-[15px] ">
//                         <img
//                           className="w-[200px] h-[150px] border-[3px]  shadow-md shadow-[#c0ad91] border-white"
//                           src={item.api_featured_image}
//                           alt={item.name}
//                         />
//                       </div>
//                       <div className="text-white bg-[#bda661] font-bold shadow-sm shadow-[#c0ad91] pl-[9px] pr-[10px] text-[13px] font-serif  p-[1px] rounded-xl">
//                         <div>{item.brand}</div>
//                       </div>
//                     </div>

//                     <div className="flex justify-between pt-[5px] pb-[15px]  ">
//                       <div className="justify-start text-left pt-[15px] ">
//                         <div className="justify-start grid">
//                           <div className="grid justify-start">
//                             <div className="text-[17px] font-extrabold pl-[7px]  font-serif text-[#926065]  ">
//                               {item.name}
//                             </div>

//                             <div className="text-[#a89770] font-bold  pl-[7px] pr-[10px] text-[11px] font-serif  p-[1px] rounded-xl grid gap-[5px]">
//                               <p>{item.product_type}</p>
//                             </div>
//                             <div className="flex pl-[1px]">
//                               <div className="text-white bg-[#a1875b] font-bold shadow-md shadow-[#c0ad91] pl-[15px] pr-[30px] text-[11px] font-serif  p-[3px] rounded-xl grid">
//                                 <a
//                                   href={item.website_link}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                 >
//                                   {item.website_link}
//                                 </a>
//                               </div>
//                               <div className="text-[25px] pr-[10px] translate-x-[-30px]">
//                                 <FcCursor />
//                               </div>
//                             </div>
//                             <div>
//                               <p className="text-[50px]  translate-y-[-288px] translate-x-[-17px]">
//                                 <FcLikePlaceholder />
//                               </p>

//                               <div
//                                 className=" h-[20px] w-[20px] text-[14px]  translate-y-[-322px] translate-x-[-3px]
//               flex justify-center items-center text-[#a68c45]  font-bold rounded-full"
//                               >
//                                 {index + 1}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex justify-between pt-[5px] pb-[15px]  ">
//                         <div className="justify-start text-left pt-[15px] ">
//                           <div className="justify-start grid">
//                             {/* Other content */}
//                             <div>
//                               <p>
//                                 Price:{" "}
//                                 {isNaN(item.priceInTHB)
//                                   ? "N/A"
//                                   : Math.floor(item.priceInTHB)}{" "}
//                                 THB
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p></p>
//             )}
//           </div>
//         </div>
//         <div className="bg-[#9fd1e1] flex justify-center position  h-[89px]">
//           <p className="grid justify-center pt-[40px] font-extrabold text-[#804d3a]">
//             find beauty and define yourself
//           </p>
//           <img
//             className="h-[620px] translate-y-[-481px] translate-x-[470px] w-[500px] relative"
//             src="/pngegg-6.png"
//             alt="makeup"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
