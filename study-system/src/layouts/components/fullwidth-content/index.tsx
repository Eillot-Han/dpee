import React from "react";
import "./index.scss";

export default function Fullwidth({ children }: { children?: React.ReactNode }) {
    return <div className="tsc-fullwidth">{children}</div>;
}