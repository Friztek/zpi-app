import { FC, ReactNode, useState } from "react";

export const Container: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid #e8ecf0",
        borderRadius: 4,
        height: 36,
        display: "flex",
        alignItems: "center",
        padding: "1px 12px",
      }}
    >
      {children}
    </div>
  );
};
