import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Lottie from "lottie-react";
import Checkmark from "../util/checkmark.json";
import { Player } from '@lottiefiles/react-lottie-player';
import Loading from '../util/loading.json';

export default function Progressbar({ value=0, title, completion, wrong=false})
{
    let playerRef = useRef();
    useEffect(() => {
        if(completion && !wrong){
            playerRef.current.play();
            setTimeout(() => playerRef.current.pause(), [850]);
        }
    }, [completion]);
    return(
        <React.Fragment>
            <div className="flex flex-row justify-center items-center">
                <h1 className="flex-2 w-6 pr-12">{title}</h1>
                <div className="w-full h-6 rounded-full border border-black flex-10 items-center bg-white overflow-hidden">
                    <div className="h-full rounded-full transition-width duration-500 ease-out text-white" style={{ width: `${value}%`, backgroundColor: `${completion && wrong ? 'red' : '#05D377'}`}}>
                        <p style={{fontSize: 12}}>{value} %</p>
                    </div>
                </div>
                {
                    completion && wrong ? <div className="flex flex-2 justify-center items-center" style={{width: 80, height: 50}}> <FaTimes className="text-red-500"/> </div>
                    : 
                    <div style={{width: 80}}>
                        <Player
                            ref={playerRef}
                            src={Checkmark}
                            className="player flex-1"
                            loop={false}
                        />
                    </div>
                }
            </div>
        </React.Fragment>
    );
}