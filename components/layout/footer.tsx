import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#2563EBDB] py-[38px]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Image
          src="/images/logo-white-img.png"
          alt="logo"
          width={134}
          height={24}
        />

        <p className="text-base font-normal leading-6 text-white">
          &copy; {new Date().getFullYear()} Blog genzed. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
