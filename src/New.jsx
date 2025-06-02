import { useState } from "react";

function New(){
    const [color,setColor] = useState("yellow")
    return(
        <>
            <h1>hello {color}</h1>    
        </>
    )
}

export default New