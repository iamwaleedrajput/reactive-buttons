import React, { useState, useEffect } from "react";

export default function Button({
  children,
  bgColor,
  textColor,
  shadow,
  ripple,
  onClick,
}) {
  const [state, setState] = useState(false),
    [coords, setCoords] = useState({ x: -1, y: -1 }),
    [isRippling, setIsRippling] = useState(false);

  // ** hex to rgba
  function convertHex(hexCode, opacity) {
    var hex = hexCode.replace("#", "");
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.substring(0, 2), 16),
      g = parseInt(hex.substring(2, 4), 16),
      b = parseInt(hex.substring(4, 6), 16);
    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
      opacity = opacity / 100;
    }
    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
  }

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);
  return (
    <button
      className={`button ${ripple ? "ripple-button" : ""}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: state && shadow && `0 4px 8px ${convertHex(bgColor, 0.5)}`,
      }}
      onMouseOver={() => setState(true)}
      onMouseOut={() => setState(false)}
      onClick={(e) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });

        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      <span className="content">{children}</span>
    </button>
  );
}
