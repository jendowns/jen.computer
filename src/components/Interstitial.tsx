import React from "react";

export const Interstitial = ({ children }: { children: React.JSX.Element }) => {
  const [showDesktop, setShowDesktop] = React.useState(false);

  const handleClick = () => {
    setShowDesktop(true);
  };

  if (!showDesktop) {
    return (
      <div
        className="disclaimer-area"
        style={{
          backgroundImage: "url('./images/bliss.png')",
          backgroundSize: "cover",
        }}
      >
        <div className="disclaimer-card">
          <h1 style={{ textAlign: "center" }}>
            welcome, traveler
            <br />
            <span aria-hidden>~*~*~*~*~</span>
          </h1>
          <span>
            this experimental site features a stylized desktop, so it's best
            viewed at desktop size.
          </span>
          <span>it also requires javascript to function.</span>
          <button className="disclaimer-button" aria-label="ok got it (click to proceed to site)" onClick={handleClick}>
            ok got it
          </button>
        </div>
      </div>
    );
  }

  return children;
};
