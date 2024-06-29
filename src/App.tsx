import React, { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./component/searchForm/brandSearch";
import DropdownButton from "./component/searchForm/searchForm";

import { eyeList, mouthList, faceList, eyebrowList } from "./utils/optionList";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { FcCursor, FcLikePlaceholder, FcRedo, FcSearch } from "react-icons/fc";
import { PiShoppingCartFill } from "react-icons/pi";
import { VscAccount, VscGift } from "react-icons/vsc";
import axios from "axios";

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

const App: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [makeupData, setMakeupData] = useState<MakeupItem[]>([]);
  const [filteredMakeupData, setFilteredMakeupData] = useState<MakeupItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [largeImage, setLargeImage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resetSearchForm] = useState<number>(0);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [showPreviousSearches, setShowPreviousSearches] =
    useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentDateTime(`${hour}:${minutes}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<MakeupItem[]>(
          "https://makeup-api.herokuapp.com/api/v1/products.json?brand"
        );
        setMakeupData(response.data);
        setFilteredMakeupData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMakeupData([]); // หรือจะ setMakeupData(null) ก็ได้ตามที่ต้องการ
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  useEffect(() => {
    const storedSearches = localStorage.getItem("previousSearches");
    if (storedSearches) {
      setPreviousSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
  }, [previousSearches]);

  const handleSearchResult = (results: MakeupItem[]) => {
    setFilteredMakeupData(results);
  };

  const handleDropdown = (itemList: string[]) => {
    const filteredData =
      itemList.length === 0
        ? makeupData
        : makeupData.filter((item) => itemList.includes(item.product_type));

    setFilteredMakeupData(filteredData);
  };

  const handleImageClick = (imageUrl: string) => {
    setLargeImage(imageUrl);
    setShowAlert(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseClick = () => {
    setLargeImage(null);
    setShowAlert(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const results = makeupData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMakeupData(results);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const results = makeupData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMakeupData(results);
      if (!previousSearches.includes(searchTerm)) {
        setPreviousSearches((prev) => [...prev, searchTerm]);
      }

      setSearchTerm(""); // เคลียร์ค่าใน input search
      setShowPreviousSearches(false); // ซ่อนแท็บผลการค้นหาก่อนหน้า
    }
  };

  const togglePreviousSearches = () => {
    setShowPreviousSearches((prev) => !prev);
  };

  const handleSearchTermSelect = (term: string) => {
    setSearchTerm(term);
    const results = makeupData.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMakeupData(results);

    if (!previousSearches.includes(term)) {
      setPreviousSearches((prev) => [...prev, term]);
    }

    setShowPreviousSearches(false);
  };

  const renderPreviousSearches = () => {
    if (showPreviousSearches && previousSearches.length > 0) {
      return (
        <div className="absolute bg-[#9fd1e1] w-[410px] h-[150px]  overflow-auto mt-[45px] border border-gray-300 rounded-b-md shadow-lg z-40">
          {previousSearches.map((term, index) => (
            <div
              key={index}
              className="p-2 font-serif text-[15px] cursor-pointer hover:bg-[#d3cfac] hover:text-[#b78e51]"
              onClick={() => handleSearchTermSelect(term)}
            >
              {term}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleSearchReset = () => {
    setSearchTerm("");
  };
  const handleClick = () => {
    setFilteredMakeupData(makeupData);
  };

  return (
    <div>
      <div className="">
        <div>
          <div className="bg-[#b78e51] text-white text-[12px]">
            <span>{currentDateTime}</span>
          </div>

          <div className=" bg-white h-[45px] flex justify-around pt-[12px] font-extrabold text-[15px] position font-serif text-[#926065] ">
            <div
              className="text-[25px] pl-[2px] xl:pl-[90px] font-[20px] text-bold  "
              onClick={handleClick}
            >
              <img
                className="h-[10px] w-[10px] xl:h-[250px] xl:w-[190px] translate-y-[-118px] translate-x-[-39px] relative "
                src="/42.png"
                alt="makeup"
              />
            </div>
            <div
              className="flex gap-[10px] text-[10px] xl:text-[15px]  flex-wrap relative z-30
            xl:gap-[35px]"
            >
              <div className="mb-4 relative">
                <DropdownButton
                  onSelect={handleDropdown}
                  title="Eyes"
                  itemList={eyeList}
                />
              </div>
              <div className="mb-4 relative">
                <DropdownButton
                  onSelect={handleDropdown}
                  title="Mouth"
                  itemList={mouthList}
                />
              </div>
              <div className="mb-4 relative">
                <DropdownButton
                  onSelect={handleDropdown}
                  title="Face"
                  itemList={faceList}
                />
              </div>
              <div className="mb-4 relative">
                <DropdownButton
                  onSelect={handleDropdown}
                  title="Eyebrows"
                  itemList={eyebrowList}
                />
              </div>
              <div className="mb-4 relative ">
                <SearchForm
                  key={resetSearchForm}
                  options={makeupData.map((item) => item.brand)}
                  makeupData={makeupData}
                  onSearchResult={handleSearchResult}
                />
              </div>
            </div>

            <div className="flex gap-[10px] text-[20px] pr-[40px] font-black">
              <div>
                <VscGift />
              </div>
              <div className="text-[18px]">
                <VscAccount />
              </div>
            </div>
          </div>
          <div className="bg-[#9fd1e1] position h-[120px]  xl:h-[160px]">
            <div className="flex  gap-[5px] xl:gap-[10px] position pt-[60px] pb-[20px]  ">
              <img
                className="h-[100px] w-[170px] translate-y-[-40px] translate-x-[30px] relative 
                            xl:h-[140px] xl:w-[240px] xl:translate-x-[130px]"
                src="/7.png"
                alt="makeup"
                onClick={handleClick}
              />
              <img
                className="h-[100px] w-[130px] translate-y-[-65px] translate-x-[-60px] relative
                xl:h-[200px] xl:w-[230px] xl:translate-y-[-95px]  xl:translate-x-[-26px]  "
                src="/41.png"
                alt="makeup"
                onClick={handleClick}
              />

              <div className=" text-white flex justify-between relative translate-x-[60px] rounded-md h-[35px] w-[420px]   z-20">
                <div className="   xl:translate-x-[31px] md:translate-x-[41px] translate-x-[-101px]">
                  <div className="relative flex font-serif shadow-sm rounded-md shadow-[#816d4e] ">
                    <input
                      type="text"
                      placeholder="search"
                      className=" text-[#b78e51] rounded-l-md pl-[40px]  w-[150px]
                      xl:h-[35px] xl:w-[420px]"
                      value={searchTerm}
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                      onClick={togglePreviousSearches}
                    />
                    <div className="grid xl:translate-x-[-413px]  font-extrabold translate-y-[-10px] translate-x-[-229px] ">
                      {renderPreviousSearches()}
                    </div>
                    <button
                      className="font-extrabold rounded-r-md pl-[30px] pr-[30px]h-[35px] bg-[#b78e51] w-[82px] text-[25px] pt-[2px]"
                      onClick={handleSearchReset}
                    >
                      <FcSearch />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {isLoading && (
              <div className="grid justify-center text-[50px] ">
                <ReactLoading type="cubes" color="gray" />
              </div>
            )}
          </div>
          <div>
            {showAlert && largeImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-30">
                <div className="absolute">
                  <img
                    src={largeImage}
                    alt="Large Makeup"
                    className="max-w-[700px] max-h-[500px]"
                    onClick={handleCloseClick}
                  />
                  <button
                    className="absolute top-[13px] right-[17px] bg-transparent border-none cursor-pointer text-[30px] z-30"
                    onClick={handleCloseClick}
                  >
                    <FcRedo />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="position">
          <div
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-[5px] xl:gap-[25px] justify-center bg-[#f1f0ee] overflow-auto 
            h-[450px] w-[550px] p-[2px] pl-[42px] pr-[2px]
            md:h-[520px] md:w-[970px]
            xl:h-[500px] xl:w-[1200px] xl:p-[20px] xl:pl-[80px] xl:pr-[30px]"
          >
            {filteredMakeupData.length > 0 ? (
              filteredMakeupData.map((item: MakeupItem, index: number) => (
                <div
                  key={index}
                  className="p-[5px] w-[50px] h-[270px] xl:p-[20px] xl:w-[270px]  xl:h-[360px]"
                >
                  <div className="p-[8px] grid  pt-[20px] gap-[10px] pl-[1px] xl:pl-[10px] xl:gap-[25px] h-[180px] w-[210px]  xl:h-[240px] xl:w-[270px] bg-[#eadfc7]  shadow-sm shadow-[#b9a383] ">
                    <div className="grid justify-center w-[270px] ">
                      <div className=" w-[150px] pb-[15px] ">
                        <img
                          className="w-[120px] h-[110px] xl:w-[200px] xl:h-[150px] border-[3px] hover:shadow-[#6e604b]  shadow-md shadow-[#c0ad91] border-white"
                          src={item.api_featured_image}
                          alt={item.name}
                          onClick={() =>
                            handleImageClick(item.api_featured_image)
                          }
                        />
                      </div>
                      <div
                        className="text-white bg-[#bda661] font-bold shadow-sm shadow-[#c0ad91] pl-[2px] pr-[5px] text-[11px]
                      xl:pl-[9px] xl:pr-[10px] xl:text-[13px] xl:translate-x-[2px] translate-x-[-20px] font-serif  p-[1px] rounded-xl"
                      >
                        <div>{item.brand}</div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-[1px]  xl:pt-[5px] pb-[5px] xl:pb-[15px] gap-[5px] xl:gap-[20px]  ">
                      <div className="justify-start text-left pt-[15px] w-[220px] ">
                        <div className="justify-start grid">
                          <div className="grid justify-start">
                            <div
                              className="text-[10px] xl:text-[17px] font-extrabold pl-[7px] font-serif text-[#926065] hover:cursor-pointer hover:text-[#6799aa]"
                              onClick={() => {
                                Swal.fire({
                                  title: item.name,
                                  text: item.description,
                                  confirmButtonText: "i love myself",
                                });
                              }}
                            >
                              {item.name}
                            </div>

                            <div className="text-[#a89770] font-bold  pl-[7px] pr-[10px] text-[11px] font-serif  p-[1px] rounded-xl grid gap-[5px]">
                              <p>{item.product_type}</p>
                            </div>
                            <div className="flex pl-[1px] pt-[5px]">
                              <div
                                className="text-white bg-[#a1875b] hover:bg-[#71a8bb] font-bold shadow-md shadow-[#c0ad91] pl-[25px] pr-[40px] text-[8px]
                               xl:pl-[25px] xl:pr-[40px] xl:text-[11px] font-serif  xl:pt-[4px] p-[5px] rounded-xl grid"
                              >
                                <a
                                  href={item.website_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span>click me!</span>
                                </a>
                              </div>
                              <div className="text-[20px] xl:text-[25px] pr-[10px] translate-x-[-30px] hover:text-[27px]">
                                <FcCursor />
                              </div>
                            </div>
                            <div>
                              <p className="text-[50px] translate-y-[-238px] xl:translate-y-[-298px] translate-x-[37px]">
                                <FcLikePlaceholder />
                              </p>

                              <div className=" h-[20px] w-[20px] text-[14px] translate-y-[-271px] xl:translate-y-[-331px] translate-x-[53px] flex justify-center items-center text-[#a68c45]  font-bold rounded-full">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="grid justify-center shadow-sm shadow-[#9f835e] pt-[5px] xl:pt-[9px]   bg-white h-[22px] w-[22px] xl:h-[32px] xl:w-[32px]  rounded-full 
                      text-[#5893a7] hover:text-[#917a48] text-[12px] xl:text-[15px] translate-x-[-60px] translate-y-[15px] z-0 xl:translate-x-[-15px]"
                        >
                          <PiShoppingCartFill />
                        </div>
                        <div
                          className="grid justify-center shadow-sm shadow-[#9f835e] pt-[5px] xl:pt-[9px]  bg-white h-[22px] w-[22px] xl:h-[32px] xl:w-[32px]  rounded-full 
                      text-[#5893a7] hover:text-[#917a48] text-[12px] xl:text-[18px] translate-x-[-60px] translate-y-[30px] xl:translate-x-[-15px]  xl:translate-y-[25px] z-0"
                        >
                          <FcLikePlaceholder />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="bg-[#9fd1e1] flex justify-center position  h-[199px]">
          <p className="grid justify-center pt-[40px] font-extrabold text-[#804d3a]">
            <img
              className="h-[1px] w-[1px] xl:h-[570px] xl:w-[450px]  translate-y-[-247px] xl:translate-y-[-277px] translate-x-[210px] xl:translate-x-[150px] relative"
              src="/The beauty bar.png"
              alt="makeup"
            />
          </p>
          <img
            className="h-[1px] w-[1px] xl:h-[620px] xl:w-[500px] translate-y-[-481px] translate-x-[350px]  relative"
            src="/pngegg-6.png"
            alt="makeup"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
