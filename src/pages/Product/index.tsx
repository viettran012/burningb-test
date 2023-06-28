import { useEffect, useState, useCallback } from "react";
import productServices from "../../services/productServices";
import { IProduct, IProductParams } from "../../configs/types";
import ProductCard from "../../components/ProductCard";
import Variants from "./components/Variants";
import Search from "./components/Search";

const bottomLimit = 100;

const Page: React.FC = () => {
  const [productList, setProductList] = useState<Array<IProduct>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFull, setIsFull] = useState<boolean>(false);

  // create params state
  const [params, setParams] = useState<IProductParams>({
    limit: 20,
    skip: 0,
    q: "",
  });

  const getProductList = useCallback(
    async (params_: IProductParams) => {
      try {
        setIsLoading(true);
        //await product data data
        const fb = params_?.q
          ? await productServices.search({
              params: { ...params_, q: params_?.q },
            })
          : await productServices.getList({ params: params_ });
        if (!fb) return;

        const products = fb?.products;
        if (products?.length) {
          // set product state
          setProductList([...productList, ...products]);
          // set params state
          setParams((preState) => ({
            ...preState,
            skip: params_?.skip / preState.limit + 1,
          }));
        } else {
          setIsFull(true);
        }
        setIsLoading(false);
      } catch (error) {}
    },
    [isLoading]
  );

  const handleOnScroll = useCallback(() => {
    const offsetHeight = document.documentElement.offsetHeight;
    // check if scroll to bottom page, it will return true
    const isBottom =
      offsetHeight - (window.innerHeight + document.documentElement.scrollTop) <
        bottomLimit &&
      !isLoading &&
      !isFull;
    if (isBottom) {
      getProductList({
        ...params,
        skip: params?.skip * 20,
      });
    }
  }, [isLoading]);

  const handleSearch = useCallback(async (searchValue: string) => {
    //set init state , clear product list state
    getProductList({
      ...params,
      skip: 0,
      q: searchValue,
    });

    setParams({
      ...params,
      q: searchValue,
    });
    setIsFull(false);
    setProductList([]);
  }, []);

  useEffect(() => {
    getProductList({
      ...params,
      skip: 0,
    });
  }, []);

  useEffect(() => {
    //add event scroll
    window.addEventListener("scroll", handleOnScroll);
    // remove event scroll when unmount
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, [isLoading]);

  return (
    <>
      <Search handleSearch={handleSearch} />
      <div className="flex items-center	justify-center">
        <div className="w-full flex-wrap flex justify-between py-3">
          {productList?.length
            ? productList?.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })
            : !isLoading && (
                <div className="py-7 h-80 flex-col w-full flex justify-center items-center">
                  <img className="h-full" src="/assest/icons/empty.png" />
                  <div className="py-3 text-xl text-gray-700 font-bold">
                    Not Found
                  </div>
                </div>
              )}
          {isLoading ? <Variants /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
