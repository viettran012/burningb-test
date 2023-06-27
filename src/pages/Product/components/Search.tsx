import { CiSearch } from "react-icons/ci";
import useDebounce from "../../../hooks/useDebounce";
import { useState, useEffect, useCallback } from "react";

function Search({ handleSearch }: { handleSearch: any }) {
  const [searchValue, setSearchValue] = useState("");
  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    handleSearch(debounced);
  }, [debounced]);

  const handleChangeSearchValue = useCallback((e: any) => {
    const value = e?.target?.value;
    setSearchValue(value);
  }, []);

  return (
    <div className="sticky z-10 top-16 w-full bg-white py-2 px-2">
      <div className="h-10 flex items-center border border-slate-400 rounded-sm">
        <input
          value={searchValue}
          onChange={handleChangeSearchValue}
          className="grow h-full px-3 border-0 outline-none"
          placeholder="Search products"
        />
        <div
          onClick={() => {
            handleSearch(searchValue);
          }}
          className="h-10 w-10 bg-slate-400 text-white cursor-pointer text-xl flex items-center justify-center hover:bg-slate-600 transition ease-in-out"
        >
          <CiSearch />
        </div>
      </div>
    </div>
  );
}

export default Search;
