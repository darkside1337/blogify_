import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer
      style={{ boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.2)" }}
      className="min-h-20 mt-8 shadow-2xl  flex justify-center items-center text-center"
    >
      <MaxWidthWrapper>
        © {new Date().getFullYear()} Darkside1337 • Built with React, DaisyUI &
        MongoDB
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
