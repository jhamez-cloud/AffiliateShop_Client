import { ReactNode } from "react";
import { Product } from "./producttype";

export type PlatformDeal = {
  platform: string;
  icon: ReactNode;
  color: string;
  tagline: string;
  products: Product[];
};