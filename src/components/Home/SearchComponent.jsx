import React from "react";
import SecondaryButton from "../common/SecondaryButton";

const SearchComponent = () => {
  return (
    <div className={`bg-[rgb(18,23,45)] p-1 w-[600px] flex border border-[#3C9CC2] rounded-2xl`}>
        <input
          className="px-4 py-2 w-full  bg-[#12172D] text-white mr-2"
          type="text"
          name="search"
          placeholder="Search anything"
          id="search"
        />
        <SecondaryButton title={"Search"} />
    </div>
  );
};

export default SearchComponent;
