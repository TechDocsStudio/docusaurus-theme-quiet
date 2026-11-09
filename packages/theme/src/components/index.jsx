import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

export function CardGrid({ children }) {
  return <div className="quiet-card-grid">{children}</div>;
}

export function Card({ to, title, children }) {
  return (
    <Link className="quiet-card" to={to}>
      <span className="quiet-card-title">{title}</span>
      {children && <div className="quiet-card-body">{children}</div>}
    </Link>
  );
}

export function Steps({ children }) {
  return <ol className="quiet-steps">{children}</ol>;
}

export function Step({ title, children }) {
  return (
    <li>
      {title && <Heading as="h3">{title}</Heading>}
      <div>{children}</div>
    </li>
  );
}
