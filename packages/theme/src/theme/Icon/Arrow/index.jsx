import React from "react";
import { ChevronRight } from "lucide-react";

export default function Icon(props) {
  return (
    <ChevronRight size={18} strokeWidth={1.6} aria-hidden="true" {...props} />
  );
}
