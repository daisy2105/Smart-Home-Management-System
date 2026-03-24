import React from "react";
import { Toaster } from "react-hot-toast";

const NotificationToaster = () => {
  return (
    <Toaster
      position="top-right"
      containerStyle={{
        top: "5%",
        right: "15%",
      }}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
};

export default NotificationToaster;