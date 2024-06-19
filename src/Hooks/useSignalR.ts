import { useContext } from "react";
import { SignalRContext } from "../Context/SignalRProvider";


export const useSignalR = () => useContext(SignalRContext)