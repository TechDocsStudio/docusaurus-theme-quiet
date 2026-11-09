import React from "react";
import { Lightbulb } from "lucide-react";

export default function Icon(props) {
  return (
    <Lightbulb size={18} strokeWidth={1.6} aria-hidden="true" {...props} />
  );
}
