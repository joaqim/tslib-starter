import React, { ReactNode } from "react";

interface Props {
  name: string;
}

export const SayHello = (props: Props & { children?: ReactNode }) => (
  <div>Hey {props.name}, say hello to TypeScript.</div>
);
