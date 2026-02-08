import { useState } from "react";
import "./AuthModal.css";

export default function AuthModal({ isOpen, onClose, onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    // Check if input is email format
    const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const validateForm = () => {
        const newErrors = {};

        if (isSignup) {
            // Signup validation
            if (!formData.name || formData.name.trim().length < 2) {
                newErrors.name = "Name must be at least 2 characters";
            }

            if (!formData.username) {
                newErrors.username = "Username is required";
            } else if (formData.username.length < 3) {
                newErrors.username = "Username must be at least 3 characters";
            } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
                newErrors.username = "Username can only contain letters, numbers, and underscores";
            }

            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!isEmail(formData.email)) {
                newErrors.email = "Please enter a valid email";
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        } else {
            // Login validation - can use username OR email
            if (!formData.username) {
                newErrors.username = "Username or email is required";
            }
        }

        // Password validation (for both signup and login)
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Determine if login was with email or username
        const loginIdentifier = formData.username;
        const usedEmail = isEmail(loginIdentifier);

        // Create user object
        const user = {
            id: Date.now(),
            name: isSignup ? formData.name : (usedEmail ? loginIdentifier.split("@")[0] : loginIdentifier),
            username: isSignup ? formData.username : (usedEmail ? loginIdentifier.split("@")[0] : loginIdentifier),
            email: isSignup ? formData.email : (usedEmail ? loginIdentifier : `${loginIdentifier}@techstore.com`),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username || formData.email}`,
            joinedDate: new Date().toISOString(),
        };

        // Save to localStorage (persistent if rememberMe is checked)
        if (rememberMe) {
            localStorage.setItem("techstore_user", JSON.stringify(user));
            localStorage.setItem("techstore_remember", "true");
        } else {
            sessionStorage.setItem("techstore_user", JSON.stringify(user));
            localStorage.removeItem("techstore_remember");
        }

        setIsLoading(false);
        onLogin(user);
        onClose();

        // Reset form
        setFormData({ name: "", username: "", email: "", password: "", confirmPassword: "" });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const toggleMode = () => {
        setIsSignup(!isSignup);
        setErrors({});
        setFormData({ name: "", username: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="auth-close" onClick={onClose}>
                    ✕
                </button>

                {/* Header */}
                <div className="auth-header">
                    <div className="auth-logo">◆</div>
                    <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
                    <p>
                        {isSignup
                            ? "Join TechStore for exclusive deals"
                            : "Sign in with your username or email"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                    {isSignup && (
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={errors.name ? "error" : ""}
                                />
                            </div>
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">
                            {isSignup ? "Username" : "Username or Email"}
                        </label>
                        <div className="input-wrapper">
                            <span className="input-icon">{isSignup ? "@" : "📧"}</span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder={isSignup ? "johndoe" : "johndoe or you@example.com"}
                                value={formData.username}
                                onChange={handleInputChange}
                                className={errors.username ? "error" : ""}
                                autoComplete="username"
                            />
                        </div>
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    {isSignup && (
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? "error" : ""}
                                    autoComplete="email"
                                />
                            </div>
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={errors.password ? "error" : ""}
                                autoComplete={isSignup ? "new-password" : "current-password"}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="error-text">{errors.password}</span>
                        )}
                    </div>

                    {isSignup && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={errors.confirmPassword ? "error" : ""}
                                    autoComplete="new-password"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <span className="error-text">{errors.confirmPassword}</span>
                            )}
                        </div>
                    )}

                    {/* Remember Me & Forgot Password */}
                    {!isSignup && (
                        <div className="form-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            <button type="button" className="forgot-password">
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button type="submit" className="auth-submit" disabled={isLoading}>
                        {isLoading ? (
                            <span className="loading-spinner"></span>
                        ) : isSignup ? (
                            "Create Account"
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="auth-divider">
                    <span>or continue with</span>
                </div>

                {/* Social Login */}
                <div className="social-buttons">
                    <button type="button" className="social-btn google">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google
                    </button>
                    <button type="button" className="social-btn apple">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path
                                fill="currentColor"
                                d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                            />
                        </svg>
                        Apple
                    </button>
                </div>

                {/* Toggle */}
                <p className="auth-toggle">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button type="button" onClick={toggleMode}>
                        {isSignup ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
}
