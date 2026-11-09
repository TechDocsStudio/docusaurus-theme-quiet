import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function PageFeedback({ className = "" }) {
  const { feedback } = usePluginData("docusaurus-theme-quiet") || {};
  if (!feedback) return null;
  return (
    <div className={`feedback-widget quiet-page-feedback ${className}`}>
      <span>{feedback.label}</span>
      <div className="pushfeedback-thumbs-row">
        {[
          { rating: "1", label: "Helpful", Icon: ThumbsUp },
          { rating: "0", label: "Not helpful", Icon: ThumbsDown },
        ].map(({ rating, label, Icon }) => (
          <feedback-button
            key={rating}
            class="quiet-feedback-thumb"
            project={feedback.project}
            rating={rating}
            button-position="default"
            button-style="default"
            modal-position="center"
            custom-font="true"
            success-message={feedback.successMessage}
          >
            <span className="quiet-feedback-choice">
              <Icon size={18} aria-hidden="true" />
              <span className="quiet-feedback-label">{label}</span>
            </span>
          </feedback-button>
        ))}
      </div>
    </div>
  );
}
