import React from "react";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  extraProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`button-custom ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props.extraProps}
    >
      {props.loading ? <CircularProgress /> : props.text}

    </button>
  );
};

export default Button;
