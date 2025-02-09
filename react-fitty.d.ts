declare module "react-fitty" {
  import { ReactNode } from "react";

  interface ReactFittyProps {
    children: ReactNode;
    minSize?: number;
    maxSize?: number;
    wrapText?: boolean;
  }

  export const ReactFitty: React.FC<ReactFittyProps>;
}
