import React from "react";
import Survey from "./components/Survey";

function App() {
  return (
    <>
      <div className="Review-container w-full h-screen">
        <div className="text-2xl text-center font-serif mt-4">Kiosk</div>
        <Survey />
      </div>
    </>
  );
}

export default App;
