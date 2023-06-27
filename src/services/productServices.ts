import { get } from "../util/request";
import { productParams, productSearchParams } from "../configs/types";

const productServices = {
  getList: function ({ params }: { params: productParams }) {
    const API = process.env.REACT_APP_MAIN_API;
    return get(
      `${API}/products?limit=${params?.limit || 10}&skip=${params?.skip || 0}`
    );
  },

  search: function ({ params }: { params: productSearchParams }) {
    const API = process.env.REACT_APP_MAIN_API;
    return get(
      `${API}/products/search?q=${params?.q || ""}&limit=${
        params?.limit || 10
      }&skip=${params?.skip || 0}`
    );
  },
};

export default productServices;
