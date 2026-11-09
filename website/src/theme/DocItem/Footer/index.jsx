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
              button-position="default"
              button-style="default"
              modal-position="center"
              custom-font="true"
            >
              <span className="quiet-feedback-choice">
                <ThumbsUp size={18} aria-hidden="true" />
                <span className="quiet-feedback-label">Helpful</span>
              </span>
            </feedback-button>
            <feedback-button
              project={project}
              rating="0"
              button-position="default"
              button-style="default"
              modal-position="center"
              custom-font="true"
            >
              <span className="quiet-feedback-choice">
                <ThumbsDown size={18} aria-hidden="true" />
                <span className="quiet-feedback-label">Not helpful</span>
              </span>
            </feedback-button>
          </div>
        </div>
      )}
      <Footer {...props} />
    </>
  );
}
