// SidebarAlert.tsx
import React from "react";

interface SidebarAlertProps {
  message: string | null;
  type: "success" | "error";
}

const SidebarAlert: React.FC<SidebarAlertProps> = ({ message, type }) => {
  if (!message) return null; // Don't render if there's no message

  const alertClass = type === "success" ? "alert alert-success" : "alert alert-danger";

  return (
    <div className={`position-fixed top-0 end-0 p-3`} style={{ zIndex: 1050 }}>
      <div className={alertClass} role="alert">
        {message}
      </div>
    </div>
  );
};

export default SidebarAlert;
