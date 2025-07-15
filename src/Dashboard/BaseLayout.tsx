import React, { ReactNode } from "react";

type BaseLayoutProps = {
  children?: ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <header>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SQATE Central Dashboard
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default BaseLayout;
