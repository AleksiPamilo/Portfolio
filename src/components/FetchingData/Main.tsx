import React from 'react';
import "./Main.css";

type FetchingDataProps = {

}

const FetchingData: React.FC<FetchingDataProps> = () => {
  return (
    <div className="text-center mt-10">
      <div className="flex justify-center items-center">
        <div className="spinner animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700" />
        <h1 className="font-bold pl-3 text-3xl md:text-5xl">Fetching Data</h1>
      </div>
    </div>
  )
}

export default FetchingData