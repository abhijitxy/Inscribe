"use client";

import { Excalidraw } from "@excalidraw/excalidraw";

const Draw = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center", flex: "0 1 auto" }}>
        Excalidraw Example
      </h1>
      <div style={{ flex: "1 0 auto", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Excalidraw />
        </div>
      </div>
    </div>
  );
};

export default Draw;
