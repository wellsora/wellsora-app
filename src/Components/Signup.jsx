import React, { useState } from "react"
import "../App.css"
import { Eye, EyeOff } from "lucide-react"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation functions
  const validateName = (name, fieldName) => {
    if (!name.trim()) return `${fieldName} is required`
    if (name.length < 2) return `${fieldName} must be at least 2 characters`
    if (!/^[a-zA-Z\s]*$/.test(name)) return `${fieldName} can only contain letters and spaces`
    return ""
  }

  const validateEmail = (email) => {
    if (!email) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    return ""
  }

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password"
    if (confirmPassword !== password) return "Passwords do not match"
    return ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear specific error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  const validateForm = () => {
    const newErrors = {
      firstName: validateName(formData.firstName, "First name"),
      lastName: validateName(formData.lastName, "Last name"),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError("")

    if (!validateForm()) {
      return
    }

    try {
      const response = await fetch(process.env.REACT_APP_SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Signed up successfully:", data)
        window.location.href = "/signin"
      } else {
        setApiError(data.message || "Signup failed. Please try again.")
      }
    } catch (error) {
      setApiError("An error occurred. Please try again later.")
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-header">
            <h1 style={{fontSize: "50px", fontFamily: "sans-serif"}}>Sign up</h1>
          </div>
          <div className="signup-subheader">
            <p className="subtitle">Join Wellsora Health to manage care</p>
          </div>

          {apiError && <div className="error-message">{apiError}</div>}

          <div className="name-fields">
            <div className="input-field">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Bernie"
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="input-field">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Sanders"
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="bernie.sanders@gmail.com"
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••"
                className={errors.password ? "error" : ""}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="confirmPassword">Re-enter password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••"
                className={errors.confirmPassword ? "error" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="signup-button">
            Get Started
          </button>

          <div className="login-link">
            Already have an account? <a href="/signin">Login</a>
          </div>

          <div className="terms">
            By continuing, you agree to our{" "}
            <a href="https://storage.googleapis.com/wellsora-cdn/assets/terms-conditions.html" target="_blank" rel="noopener noreferrer" className="terms-link">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="https://storage.googleapis.com/wellsora-cdn/assets/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="terms-link">
              Privacy Policy
            </a>
          </div>
        </form>
      </div>
      <div className="brand-section">
        <h1 style={{color: "white", fontSize: "65px"}}>Wellsora Health</h1>
      </div>
    </div>
  )
}

export default Signup

