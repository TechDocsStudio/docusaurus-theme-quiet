import React from "react";
import { SquarePen } from "lucide-react";

export default function Icon(props) {
  return (
    <SquarePen size={16} strokeWidth={1.6} aria-hidden="true" {...props} />
  );
}
