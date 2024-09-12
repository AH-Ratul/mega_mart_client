import React from "react";

const Modal = ({ modal }) => {
  return (
    <main className="fixed h-[100dvh] bg-primary z-30 inset-0 flex justify-center items-center overflow-hidden">
      <div>{modal}</div>
    </main>
  );
};

export default Modal;
