import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function DocFooter(props) {
  const { siteConfig } = useDocusaurusContext();
  const project = siteConfig.customFields?.feedbackProject;
  return (
    <>
      {project && (
        <div className="feedback-widget">
          <span>Was this helpful?</span>
          <div className="pushfeedback-thumbs-row">
            <feedback-button
              project={project}
              rating="1"
              button-style="default"
              modal-position="center"
            >
              <ThumbsUp size={18} aria-hidden="true" /> Helpful
            </feedback-button>
            <feedback-button
              project={project}
              rating="0"
              button-style="default"
              modal-position="center"
            >
              <ThumbsDown size={18} aria-hidden="true" /> Not helpful
            </feedback-button>
          </div>
        </div>
      )}
      <Footer {...props} />
    </>
  );
}
