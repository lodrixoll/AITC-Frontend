import React, { useEffect, useState } from "react";
import { FaSpinner } from 'react-icons/fa';
import Progressbar from "./ProgressBar";

function LoadingModal({title, show, onClose}){
  const [show1, setShow1] = useState(false);
  const [progress1,setProgress1]= useState(0);
  const [completion1, setCompletion1] = useState(false);
  const [progress2,setProgress2]= useState(0);
  const [completion2, setCompletion2] = useState(false);
  const [progress3,setProgress3]= useState(0);
  const [completion3, setCompletion3] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!completion1) {
        if (progress1 < 100) {
          setProgress1(prevProgress => prevProgress + 5);
        } else {
          setCompletion1(true);
        }
      } else if (completion1 && !completion2) {
        if (progress2 < 100) {
          setProgress2(prevProgress => prevProgress + 5);
        } else {
          setCompletion2(true);
        }
      } else if (completion2 && !completion3) {
        if (progress3 < 100) {
          setProgress3(prevProgress => prevProgress + 5);
        } else {
          setCompletion3(true);
          clearInterval(interval); // Stop the interval
        }
      }
    }, 200); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [progress1, progress2, progress3, completion1, completion2, completion3]);

  useEffect(() => {
    setShow1(show);
  }, [show]);

  return (
    <div
      style={{
        visibility: show1 ? "visible" : "hidden",
        opacity: show1 ? "1" : "0"
      }}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black bg-opacity-70 transition-opacity duration-500 opacity-0 invisible"
    >
      <div className="mx-auto my-70 px-20 py-20 bg-white rounded-lg w-6/12 relative flex flex-col gap-5">
        <h1>Checking In all the documents...</h1>
        <Progressbar key={1} value={progress1} title={"AD"} completion={completion1}/>
        <Progressbar key={2} value={progress2} title={"FHDA"} setCompletion={setCompletion2} completion={completion2}/>
        <Progressbar key={3} value={progress3} title={"PRBS"} setCompletion={setCompletion3} completion={completion3}/>
      </div>
    </div>
  );
};

export default LoadingModal;