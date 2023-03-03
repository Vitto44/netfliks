import React, { useCallback, useEffect, useState } from "react";

interface AlertProps {
  title: string;
  description: string;
  type: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const Alert: React.FC<AlertProps> = ({
  title,
  description,
  type,
  show,
  setShow,
}) => {
  const getType = useCallback(() => {
    switch (type) {
      case "error":
        return "bg-red-600";
      case "success":
        return "bg-green-500";

      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    show &&
      setTimeout(() => {
        setShow(false);
      }, 2000);
  }, [setShow, show]);

  return (
    <div
      className={`w-72 text-white absolute top-[50%] -left-72 opacity-0 transition-all duration-1000 ${
        show && "opacity-100 left-4"
      }`}
    >
      <div className={`${getType()}  font-bold rounded-t px-4 py-2`}>
        {title}
      </div>
      <div className=" rounded-b bg-gray-600 px-4 py-3 ">{description}</div>
    </div>
  );
};

export default Alert;
