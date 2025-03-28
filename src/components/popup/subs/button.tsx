import { useState } from "react";

interface ButtonProps {
  width: string; // ex) 80px, 50vw
  height: string;
  text: string;
  color?: string;
  textColor?: string;
  onClick: (...args: any[]) => any;
  // padding: string[]; // [top, left, botton, right]
}

function Button(props: ButtonProps) {
  const [isClicking, setIsClicking] = useState(false);
  const { width, height, text, color = "#9696A2", textColor = "#FFFFFF", onClick } = props;

  function handleMouseUp() {
    setIsClicking(false);
    onClick();
  }

  return (
    <div
      style={{
        width: width,
        height: height,
        lineHeight: height,
        backgroundColor: color,
        color: textColor
      }}
      className={`text-[#F4F4F7] text-center rounded-lg cursor-pointer ${
        isClicking ? "opacity-75" : ""
      }`}
      onMouseDown={() => setIsClicking(true)}
      onMouseUp={handleMouseUp}
    >
      {text}
    </div>
  );
}

export default Button;
