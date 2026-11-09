import React from "react";
import { TriangleAlert } from "lucide-react";

export default function Icon(props) {
  return (
    <TriangleAlert size={18} strokeWidth={1.6} aria-hidden="true" {...props} />
  );
}
