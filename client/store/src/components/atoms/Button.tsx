import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "icon";
}

function Button({
  children,
  variant = "primary",
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-6 py-2 gap-2 font-medium rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-50";

  const variantClasses = {
    primary: "bg-primary text-white hover:opacity-90 disabled:border disabled-border-primary",
    outline:
      "bg-surface text-white border-[1.5px] border-gray-400 hover:text-primary hover:border-primary",
      icon: "rounded-full bg-surface p-2.5 hover:bg-background"
  };

  const merged = twMerge(clsx(baseClasses, variantClasses[variant], className));

  return (
    <button className={merged} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button