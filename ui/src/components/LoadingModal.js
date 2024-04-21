import React, { useEffect, useState } from "react";
import Progressbar from "./ProgressBar";
import { Player } from '@lottiefiles/react-lottie-player';
import Lottie from "lottie-react";
import Loading from '../util/loading.json';
import Loading2 from '../util/loading2.json';

function LoadingModal({ show, setIsLoading, setIsLoading2, isLoading2, initialCompletenes}){
  const [show1, setShow1] = useState(false);
  const [progress1, setProgress1]= useState(0);
  const [completion1, setCompletion1] = useState(false);
  const [progress2, setProgress2]= useState(0);
  const [completion2, setCompletion2] = useState(false);
  const [progress3,setProgress3]= useState(0);
  const [completion3, setCompletion3] = useState(false);
  const [progress4,setProgress4]= useState(0);
  const [completion4, setCompletion4] = useState(false);
  const [progress5,setProgress5]= useState(0);
  const [completion5, setCompletion5] = useState(false);
  const [progress6,setProgress6]= useState(0);
  const [completion6, setCompletion6] = useState(false);
  const [progress7,setProgress7]= useState(0);
  const [completion7, setCompletion7] = useState(false);
  const [progress8, setProgress8]= useState(0);
  const [completion8, setCompletion8] = useState(false);
  const [progress9, setProgress9]= useState(0);
  const [completion9, setCompletion9] = useState(false);

  const updateProgress = (progress, setProgress, setCompletion) => {
    if (progress < 100) {
      setProgress(prevProgress => prevProgress + 10);
    } else {
      setCompletion(true);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!completion1) {
        updateProgress(progress1, setProgress1, setCompletion1);
      } else if (completion1 && !completion2) {
        updateProgress(progress2, setProgress2, setCompletion2);
      } else if (completion2 && !completion3) {
        updateProgress(progress3, setProgress3, setCompletion3);
      } else if (completion3 && !completion4) {
        updateProgress(progress4, setProgress4, setCompletion4);
      } else if (completion4 && !completion5) {
        updateProgress(progress5, setProgress5, setCompletion5);
      } else if (completion5 && !completion6) {
        updateProgress(progress6, setProgress6, setCompletion6);
      } else if (completion6 && !completion7) {
        updateProgress(progress7, setProgress7, setCompletion7);
      } else if (completion7 && !completion8) {
        updateProgress(progress8, setProgress8, setCompletion8);
      } else if (completion8 && !completion9) {
        if (progress9 < 100) {
          setProgress9(prevProgress => prevProgress + 10);
        } else {
          setCompletion9(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          clearInterval(interval);
        }
      } 
    }, 200); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [progress1, progress2, progress3, progress4, progress5, progress6, progress7, progress8, progress9, completion1, completion2, completion3, completion4, completion5, completion6, completion7, completion8, completion9]);

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
      <div className="mx-auto my-70 px-10 py-10 bg-white rounded-lg w-6/12 relative flex flex-col">
        {
          isLoading2 ? 
          <div className="text-center py-4 flex justify-center items-center">
            <Lottie animationData={Loading2} loop={true} className="w-6/12"/>
          </div> : 
          <>
            <h1>Checking In all the documents...</h1>
            <div className="flex flex-row">
              <div className="flex-1">
                <Progressbar key={1} value={progress1} title={"AD"} completion={completion1} wrong={initialCompletenes['DISCLOSURE REGARDING REAL ESTATE AGENCY RELATIONSHIP'].toLowerCase() === 'incomplete'}/>
                <Progressbar key={2} value={progress2} title={"FHDA"} setCompletion={setCompletion2} completion={completion2} wrong={initialCompletenes['FAIR HOUSING AND DISCRIMINATION ADVISORY'].toLowerCase() === 'incomplete'}/>
                <Progressbar key={3} value={progress3} title={"PRBS"} setCompletion={setCompletion3} completion={completion3}/>
                <Progressbar key={4} value={progress4} title={"WFA"} setCompletion={setCompletion4} completion={completion4} />
                <Progressbar key={5} value={progress5} title={"BHIA"} setCompletion={setCompletion5} completion={completion5}/>
              </div>
              <div className="flex-1">
                <Progressbar key={6} value={progress6} title={"RPA"} setCompletion={setCompletion6} completion={completion6}/>
                <Progressbar key={7} value={progress7} title={"BIA"} setCompletion={setCompletion7} completion={completion7} wrong={initialCompletenes['BUYER’S INVESTIGATION ADVISORY'].toLowerCase() === 'incomplete'}/>
                <Progressbar key={8} value={progress8} title={"FAAA"} setCompletion={setCompletion8} completion={completion8} wrong={initialCompletenes['FAIR APPRAISAL ACT ADDENDUM'].toLowerCase() === 'incomplete'}/>
                <Progressbar key={9} value={progress9} title={"CCPA"} setCompletion={setCompletion9} completion={completion9} />
              </div>
            </div>
            
          </>
        }
      </div>
    </div>
  );
};

export default LoadingModal;