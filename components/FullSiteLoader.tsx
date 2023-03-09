import React from "react";

interface Props {
  isLoading: boolean;
}

const FullSiteLoader: React.FC<Props> = ({ isLoading }) => {
  return (
    <div
      className={`bg-gray-800 bg-opacity-85 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center ${
        isLoading ? "visible" : "hidden"
      }`}
    >
      <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-red-600" />
    </div>
  );
};

export default FullSiteLoader;
