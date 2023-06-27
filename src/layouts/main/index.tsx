import { ReactNode } from "react";
import Header from "./components/Header";

function MainLayout(props: { children: ReactNode }) {
  return (
    <div className="max-w-xl w-full px-3">
      <Header></Header>
      {props.children}
    </div>
  );
}

export default MainLayout;
