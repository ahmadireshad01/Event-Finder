
import * as React from "react";


// ...other imports

type LineUpProps = {
    img: string;
    title: string;
    time: string;
    id: string | number;
}
    // add any other existing props if needed



export default function LineUp(event: LineUpProps): React.JSX.Element {
    return (
    <div className="flex flex-row items-start gap-3 ml-[-20px] p-4 hover:bg-gray-600 rounded-lg transition-all duration-200">
        <img src={event.img}/>
        <div className="pt-1">
            <p className="font-semibold">{event.title}</p>
            <p className="text-gray-400 font-light">{event.time}</p>
        </div>
    </div>
    );
}