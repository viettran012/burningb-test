import { get } from "../util/request";
import { IProductParams } from "../configs/types";

interface IParams {
  params: IProductParams;
}

const productServices = {
  getList: function ({ params }: IParams) {
    const API = process.env.REACT_APP_MAIN_API;
    return get(
      `${API}/products?limit=${params?.limit || 10}&skip=${params?.skip || 0}`
    );
  },

  search: function ({ params }: IParams) {
    const API = process.env.REACT_APP_MAIN_API;
    return get(
      `${API}/products/search?q=${params?.q || ""}&limit=${
        params?.limit || 10
      }&skip=${params?.skip || 0}`
    );
  },
};

export default productServices;
