import axios from "axios";

export const FetchData = async () => {
  try {
    const url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand";
    const response = await axios.get(url);

    console.log(response.data);
    return response.data; // Return data fetched from the API
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
