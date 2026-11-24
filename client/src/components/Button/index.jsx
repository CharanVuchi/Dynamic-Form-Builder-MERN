import React from "react";

const BUTTON_VARIANTS = {
  primary: "bg-[#161F42] text-white border border-[#161F42] hover:bg-[#404D81] hover:border-[#404D81]",

  secondary: "bg-[#9CD3BB] text-[#161F42] border border-[#9CD3BB] hover:bg-[#BDE2D1] hover:border-[#BDE2D1]",

  outline: "bg-transparent text-[#161F42] border border-[#161F42] hover:bg-[#E7ECFF4D]",
};

const Button = ({ variant = "primary", textContent, children, onClick, type = "button", isLoading = false, className = "", disabled = false, icon, rightIcon, style, ...rest }) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-2.5
        min-h-11
        rounded-lg
        text-sm font-medium
        whitespace-nowrap
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-[#161F42]/20 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary}
        ${className}
      `}
      {...rest}>
      {/* Left Icon */}
      {!isLoading && icon && <span className="flex items-center justify-center shrink-0">{React.cloneElement(icon, { size: 18 })}</span>}

      {/* Loading Spinner */}
      {isLoading && (
        <svg className="w-5 h-5 animate-spin shrink-0" viewBox="0 0 24 24" fill="none" role="status" aria-label="Loading">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}

      {/* Button Text */}
      {textContent || children}

      {/* Right Icon */}
      {!isLoading && rightIcon && <span className="flex items-center justify-center shrink-0">{React.cloneElement(rightIcon, { size: 18 })}</span>}
    </button>
  );
};

export default Button;
