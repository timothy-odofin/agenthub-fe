import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    // fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔹 Validation method
  const validate = () => {
    const newErrors = {};

    // if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Dummy API call simulation
  const registerUser = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve("success"), 1000);
    });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await registerUser();
      console.log("✅ Form submitted:", form);
      alert("Form submitted successfully (stub)");
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ECF3FF] items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <h1 className="font-extrabold flex items-center"><img src="/bot-logo.png" alt="" className="w-[40px] "/> {" "} BOTMATE</h1>
        <div className="bg-white w-full max-w-[500px] shadow-md rounded-[20px] p-8 max-sm:p-4 flex flex-col items-center mx-5 mt-3 mb-2">
          <div className="title text-center mb-3">
            <h2 className="text-[25px]">Create an Account</h2>
            <p className="text-sm text-gray-400">
              Join us today and get started with your journey
            </p>
          </div>

          <div className="google-btn w-full mb-1">
            <Button
              variant="outline"
              className="w-full cursor-pointer border-gray-100 hover:shadow-sm flex items-center justify-center"
            >
              <img src="/google.png" alt="Google Logo" className="w-5 h-5 mr-2" />
              <p>Sign up with Google</p>
            </Button>
          </div>

          <div className="divider flex items-center w-full my-4 mb-1">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-4 w-full">
              {/* Full Name */}
              {/* <div className="input-group flex flex-col gap-2 relative">
                <label className="text-[15px] font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full border border-zinc-200 rounded-sm h-[30px] px-3 text-[15px]"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm">{errors.fullName}</span>
                )}
              </div> */}

              {/* Email */}
              <div className="input-group flex flex-col gap-2 relative">
                <label className="text-[15px] font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-zinc-200 rounded-sm h-[40px] px-3 text-[15px]"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="input-group flex flex-col gap-2 relative">
                <label className="text-[15px] font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-zinc-200 rounded-sm h-[40px] px-3 text-[15px]"
                  placeholder="Create a strong password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="input-group flex flex-col gap-2 relative">
                 <label className="text-[15px] font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="w-full border border-zinc-200 rounded-sm h-[40px] px-3 text-[15px]"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white h-[40px] mt-2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <p className="text-sm text-gray-400 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
