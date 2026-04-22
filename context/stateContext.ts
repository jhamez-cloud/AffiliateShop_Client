import { createContext } from "react";
import { notificationContextType } from "./contextType";

export const notificationContext = createContext<notificationContextType | null>(null)