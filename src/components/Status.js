import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import StatusIcon from "./StatusIcon";
import "@/styles/status.css";

function StatusDropdown({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(status);
  const dropdownRef = useRef(null);

  const getStatusLabel = (status) => {
    switch (status) {
      case -1:
        return "To Do";
      case 0:
        return "In Progress";
      case 1:
        return "Completed";
      default:
        return "Status";
    }
  };

  const handleOpen = () => setOpen((prev) => !prev);

  const handleStatusChange = async (newStatus) => {
    try {
      const status = await onChange(newStatus);
      if (status) {
        setStatusValue(newStatus);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="status-dropdown" ref={dropdownRef}>
      <button className="secondary btn" onClick={handleOpen}>
        <StatusIcon status={statusValue} size="small" />
        <span>{getStatusLabel(statusValue)}</span>
        {open ? (
          <IoMdArrowDropup size={20} color="#c9145f" />
        ) : (
          <IoMdArrowDropdown size={20} color="#c9145f" />
        )}
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => handleStatusChange(-1)}>
            <StatusIcon status={-1} size="small" />
            <div>To Do</div>
          </div>
          <div className="dropdown-item" onClick={() => handleStatusChange(0)}>
            <StatusIcon status={0} size="small" />
            <div>In Progress</div>
          </div>
          <div className="dropdown-item" onClick={() => handleStatusChange(1)}>
            <StatusIcon status={1} size="small" />
            <div>Completed</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusDropdown;
