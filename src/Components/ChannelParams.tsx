import ChannelClass from "./Channel";
import { useParams } from "react-router-dom";

// this function exists only to pass url to ChannelClass (since classes can't use useParams)
function Channel() {
    const { ChannelId } = useParams(); // ChannelId is the name of the variable in the URL
    return(
        <div>
            <ChannelClass ChannelId={ChannelId || ""}></ChannelClass>
        </div>
    )
}

export default Channel;