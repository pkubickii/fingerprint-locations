import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex h-16 flex-wrap items-center justify-center bg-slate-500">
      <div className="text-xl font-bold text-slate-700">© 2022 Copyright:</div>
      <a
        className="ml-5 text-slate-800"
        href="https://github.com/pkubickii"
        target="_blank"
        rel="noreferrer"
      >
        pkubickii@github
      </a>
    </footer>
  );
};
export default Footer;
