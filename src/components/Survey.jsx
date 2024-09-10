import React, { useState } from "react";
import Review from "./Review";

function Survey() {
  const [startFeedback, setFeedback] = useState(false);
  return (
    <div className="flex justify-center mt-24 text-center">
      {!startFeedback ? (
        <div className="flex flex-col font-semibold text-xl leading-none gap-4 items-center">
          <h1>Welcome to the Customer Survey!</h1>
          <p>Please give us your feedback.</p>
          <button
            className="px-5 py-3 bg-yellow-800  rounded-md text-white max-w-44 hover:bg-yellow-500"
            onClick={() => setFeedback(true)}
          >
            Start Survey
          </button>
        </div>
      ) : (
        <Review />
      )}
    </div>
  );
}

export default Survey;
