import React, { useEffect, useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

const Questions = [
  {
    id: 1,
    Question: "1. How satisfied are you with our products?",
    type: "range",
    range: 5,
  },
  {
    id: 2,
    Question: "2. How fair are the prices compared to similar retailers?",
    type: "range",
    range: 5,
  },
  {
    id: 3,
    Question:
      "3. How satisfied are you with the value for money of your purchase?",
    type: "range",
    range: 5,
  },
  {
    id: 4,
    Question:
      "4. On a scale of 1-10 how would you recommend us to your friends and family?",
    type: "range",
    range: 10,
  },
  {
    id: 5,
    Question: "5. What could we do to improve our service?",
    type: "text",
  },
];

function Review({ setFeedback }) {
  const [currentQuestionIndx, setcurrentquestionIndx] = useState(0);
  const [answer, setAnswer] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [Greet, setGreet] = useState(false);

  useEffect(() => {
    const session = uuidv4();
    setSessionId(session);
    localStorage.setItem("sessionId", session);
  }, []);

  const handleRating = (questionId, answer) => {
    setAnswer((prev) => ({ ...prev, [questionId]: answer }));
    localStorage.setItem(
      "answer",
      JSON.stringify({ ...answer, [questionId]: answer })
    );
  };

  const handleNext = () => {
    if (currentQuestionIndx < Questions.length - 1) {
      setcurrentquestionIndx(currentQuestionIndx + 1);
    } else {
      setGreet(true);
      setFeedback(false);
      console.log("Thanks");
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndx > 0) {
      setcurrentquestionIndx(currentQuestionIndx - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const currentQuestion = Questions[currentQuestionIndx];

  return (
    <>
      {!Greet ? (
        <div className="card bg-blue-500 text-white font-semibold px-4 py-2 md:p-20 rounded-lg">
          <h1 className="sm:text-2xl">Customer FeedBack!</h1>
          <div className="card-datial flex flex-col items-center gap-10 mb-10">
            {currentQuestionIndx !== Questions.length - 1 && (
              <p
                className={`cursor-pointer bg-blue-400 hover:bg-blue-200 text-white rounded-md px-2 py-1 w-fit self-end`}
                onClick={handleSkip}
              >
                skip
              </p>
            )}
            <p>{currentQuestion.Question}</p>

            {currentQuestion.type === "range" && (
              <div className="">
                <div className="rating-option-list flex flex-wrap justify-center gap-1 sm:6 md:gap-10">
                  {[...Array(currentQuestion.range).keys()].map((i) => (
                    <div
                      key={i + 1}
                      className={`rating-review flex text-sm w-6 h-6 rounded-full justify-center items-center txet-white cursor-pointer hover:bg-orange-500 hover:text-gray-300 ${
                        answer[currentQuestion.id] === (i + 1).toString()
                          ? "bg-orange-500"
                          : "bg-blue-400 "
                      } `}
                      onClick={() =>
                        handleRating(currentQuestion.id, (i + 1).toString())
                      }
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentQuestion.type === "text" && (
              <input
                className="text-input w-full bg-slate-50 h-20 text-center outline-none border-none rounded-md text-black"
                onChange={(e) =>
                  handleRating(currentQuestion.id, e.target.value)
                }
                placeholder="Your answer.."
                value={answer[currentQuestion.id] || ""}
              />
            )}
          </div>

          <div className="flex items-center justify-center">
            {Questions.map((question) => (
              <TbPointFilled
                key={question.id}
                className={`${
                  question.id === currentQuestion.id
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>

          <div className="navigateButton">
            <button
              onClick={handlePrev}
              className="bg-blue-900 hover:bg-blue-500 cursor-pointer rounded-md  px-3 py-1 mx-1"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="bg-violet-800  hover:bg-violet-500 cursor-pointer rounded-md px-3 py-1 mx-1"
            >
              {currentQuestionIndx === Questions.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="Thank-you-message  px-4 py-4 md:p-20 bg-blue-500 text-white font-semibold rounded-lg">
          <h2>Thank You!</h2>
          <p>Your answers have been submitted. We appreciate your feedback.</p>
        </div>
      )}
    </>
  );
}

export default Review;
