import { twMerge } from "tailwind-merge";

const MaxWidthWrapper = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `max-w-screen-xl w-full mx-auto px-8 md:px-10`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
