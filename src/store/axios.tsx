import axios from "axios";
import * as https from "https";

export const fetchData = async () => {
  try {
    const url = "https://makeup-api.herokuapp.com/api/v1/products.json?brand";
    const response = await axios.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
