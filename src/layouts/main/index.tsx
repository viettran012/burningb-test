import { ReactNode } from "react";
import Header from "./components/Header";

interface IManLayLout {
  children: ReactNode;
}

const MainLayout: React.FC<IManLayLout> = ({ children }) => {
  return (
    <div className="max-w-xl w-full px-3">
      <Header></Header>
      {children}
    </div>
  );
};

export default MainLayout;
