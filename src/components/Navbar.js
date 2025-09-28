'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import "@/styles/global.css";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();;
  const path = pathname.split('/')[1];
  const handleNavigation = () => {
    if(path==='task'){
      router.push('/')
    }else{
      router.push("/task/new");
    }
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1>Task Manager</h1>
        <button className="primary-btn" onClick={handleNavigation}>
          {path==='task'?'Go Back':'+ Add Task'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
