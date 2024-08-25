import React from "react";
import useAuth from "../../hooks/useAuth";

const MyAccount = () => {
  const { user } = useAuth();
  return (
    <main className="flex justify-center items-center mt-9">
      <div className="border border-b1 px-8 py-5 rounded-md w-[80%]">
        <h1 className="font-bold text-xl text-primary">My Account</h1>
        <div className="flex justify-between items-center mt-3 text-black/70 font-light">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
        <div className="mt-5">
            <button className="text-sm border border-b1 rounded-md p-3 text-black/60">Change Password</button>
        </div>
      </div>
    </main>
  );
};

export default MyAccount;
