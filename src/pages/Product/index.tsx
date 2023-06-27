import { useEffect, useState, useCallback } from "react";
import productServices from "../../services/productServices";
import { productParams } from "../../configs/types";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import Variants from "./components/Variants";
import Search from "./components/Search";
import { TbMoodEmpty } from "react-icons/tb";

const bottomLimit = 100;

function Page() {
  const [productList, setProductList]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFull, setIsFull] = useState(false);

  const [params, setParams] = useState({
    limit: 20,
    skip: 0,
    q: "",
  });

  const getProductList = useCallback(
    async (params_: productParams) => {
      try {
        setIsLoading(true);
        const fb = params_?.q
          ? await productServices.search({
              params: { ...params_, q: params_?.q },
            })
          : await productServices.getList({ params: params_ });
        if (!fb) return;

        const products = fb?.products;
        console.log(params_);
        if (products?.length) {
          setProductList([...productList, ...products]);
          setParams((preState: any) => ({
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
    const isBottom =
      offsetHeight - (window.innerHeight + document.documentElement.scrollTop) <
        bottomLimit &&
      !isLoading &&
      !isFull;
    if (isBottom) {
      console.log("call");

      getProductList({
        ...params,
        skip: params?.skip * 20,
      });
    }
  }, [isLoading]);

  const handleSearch = useCallback(async (searchValue: any) => {
    console.log("ok");
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
    window.addEventListener("scroll", handleOnScroll);
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, [isLoading]);

  return (
    <>
      <Search handleSearch={handleSearch} />
      <div className="flex items-center	justify-center">
        <div className="w-full flex-wrap flex justify-between py-3">
          {productList?.length
            ? productList?.map((product: any, index: any) => {
                return <ProductCard key={index} product={product} />;
              })
            : !isLoading && (
                <div className="py-7 h-80 flex-col w-full flex justify-center items-center">
                  <img className="h-full" src="/assest/icons/empty.png" />
                  <div className="py-3 text-xl text-gray-700 font-bold">
                    Empty
                  </div>
                </div>
              )}
          {isLoading ? <Variants /> : null}
        </div>
      </div>
    </>
  );
}

export default Page;
