import { useState, useRef, useEffect } from "react"
import { HiDotsVertical } from "react-icons/hi";
import "./ActionDropdown.css"

export const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        <HiDotsVertical />
      </button>
      {isOpen && (
        <div style={{top: "150%"}} className="dropdown-menu">
          <button
            onClick={() => {
              // send user to settings page
            }}
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  )
}

