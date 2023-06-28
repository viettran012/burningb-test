import Rating from "../Rating";
import { IProduct } from "../../configs/types";

interface IProductCard {
  product: IProduct;
}

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  return (
    <div className="flex flex-col px-2 py-2 rounded w-49/100 h-96 overflow-hidden mb-2 bg-white cursor-pointer shadow-md transition ease-in-out hover:scale-102">
      <div className="grow overflow-hidden">
        <img
          loading="lazy"
          className="w-full h-full object-cover"
          alt={product?.title}
          src={product?.thumbnail}
        />
      </div>
      <div className="px-3 py-2">
        <h2 className="f text-base font-semibold py-1">{product?.title}</h2>
        <Rating rating={product.rating} />
        <div className="flex justify-between items-center mt-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Brand: {product?.brand}
          </div>
          <div className="text-lg font-semibold">${product?.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
