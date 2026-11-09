import React from "react";
import { CircleAlert } from "lucide-react";

export default function Icon(props) {
  return (
    <CircleAlert size={18} strokeWidth={1.6} aria-hidden="true" {...props} />
  );
}
