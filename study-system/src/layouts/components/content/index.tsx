import React from "react";
import "./index.scss";

export default function Content({ children }: { children?: React.ReactNode }) {
  return <div className="tsc-content">{children}</div>;
}
