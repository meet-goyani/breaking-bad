import React from "react";
import { Oval } from "react-loader-spinner";
export default function Loading() {
  return (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{
        position: "absolute",
        left: "50%",
        bottom: "50%",
        transform: `translateX(-50%)`,
      }}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={3}
      strokeWidthSecondary={2}
    />
  );
}
