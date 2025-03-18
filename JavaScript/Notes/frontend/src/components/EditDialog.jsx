import React from "react";

const EditDialog = ({
  isOpen,
  onClose,
  title,
  primaryAction,
  secondaryAction,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/70 flex items-center justify-center">
      <div className="p-4 rounded-md bg-neutral-100 flex flex-col relative max-w-lg w-full mx-4">
        {/* Close BTN */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-md hover:bg-neutral-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 50 50"
          >
            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
          </svg>
        </button>
        {/* Header */}
        <h3 className="text-3xl font-semibold mb-8 text-center">{title}</h3>

        {/* Content */}
        <div className="mt-3 mb-8 flex flex-col">{children}</div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-3">
          <button
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 cursor-pointer rounded-sm border border-neutral-300"
            onClick={primaryAction.action}
          >
            {primaryAction.label}
          </button>
          <button
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 cursor-pointer rounded-sm border border-neutral-300"
            onClick={secondaryAction.action}
          >
            {secondaryAction.label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;
