/**
 * Renders the Article Details
 */
import React from "react";
export function Article({ title, link, description }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <hr />
        <div className="card-text" style={{ overflow: "hidden" }}>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
        <a href={link} className="btn btn-primary">
          Go to Article Page
        </a>
      </div>
    </div>
  );
}
