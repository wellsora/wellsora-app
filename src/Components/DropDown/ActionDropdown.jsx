import { useState, useRef, useEffect } from "react"
import { HiDotsVertical } from "react-icons/hi";
import "./ActionDropdown.css"

export const ActionDropdown = ({ onEdit, onDelete }) => {
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
        <div className="dropdown-menu">
          <button
            onClick={() => {
              onEdit()
              setIsOpen(false)
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete()
              setIsOpen(false)
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

