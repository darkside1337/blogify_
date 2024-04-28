import { Link } from "react-router-dom";
import React from "react";

const SuccessfulLoginAlert = () => {
  return (
    <div className="max-w-[275px] ">
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>Logged in successfully, You'll be redirected :)</div>
        <div>
          If not redirected, <Link className="link">Click here</Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default SuccessfulLoginAlert;
