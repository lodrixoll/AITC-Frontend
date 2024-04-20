import React, { useEffect, useState } from "react";

export default function Progressbar({ value=0, title, completion})
{
    return(
        <React.Fragment>
            <div className="flex flex-row justify-center items-center gap-10">
                <h1 className="flex-2 w-6">{title}</h1>
                <div className="w-full h-10 rounded-full border border-black flex-10 items-center bg-white overflow-hidden">
                    <div className="h-full rounded-full bg-green-500 transition-width duration-500 ease-out text-white" style={{ width: `${value}%` }}>
                        {value} %
                    </div>
                </div>
                <input
                    type="checkbox"
                    className="form-checkbox flex-2 h-6 w-6 text-green-500"
                    checked={completion}
                />
            </div>
        </React.Fragment>
    );
}