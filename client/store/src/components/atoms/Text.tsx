import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: "normal" | "primary" | "disabled" | "error";
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4";
  className?: string;
}

const sizeClasses: Record<NonNullable<TextProps["size"]>, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const variantClasses = {
  normal: "text-white",
  primary: "text-primary",
  disabled: "text-gray-400",
  error: "text-red-400",
};

const Text = ({
  children,
  variant = "normal",
  size = "base",
  as: Component = "p",
  className,
  ...props
}: TextProps) => {
  const classes = twMerge(
    clsx(variantClasses[variant], sizeClasses[size], className)
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;