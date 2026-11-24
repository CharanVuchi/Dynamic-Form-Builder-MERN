import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";

import { Button, TextInput } from "src/components";
import useAuth from "src/hooks/useAuth";
import { useToast } from "src/hooks/useToast";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { username, password } = loginForm;

    if (!username.trim()) {
      toast.error("Please enter your username.");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      login();

      toast.success("Welcome back! Signed in successfully.");

      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#161F42] via-[#26345F] to-[#9CD3BB] px-4 py-10">
      {/* Background Decorations */}
      <div className="absolute -top-40 -right-32 h-[450px] w-[450px] rounded-full bg-[#9CD3BB]/20 blur-3xl" />

      <div className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-white/10 blur-3xl" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[440px] rounded-2xl border border-white/60 bg-white p-8 shadow-2xl sm:p-10">
        {/* Branding */}
        <div className="mb-9">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#161F42] text-[#9CD3BB] shadow-md">
              <span className="text-lg font-bold">DFB</span>
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#161F42]">Form Builder</h2>
              <p className="text-xs text-[#8190AA]">Dynamic Form Management</p>
            </div>
          </div>

          <h1 className="text-[28px] font-bold tracking-tight text-[#161F42]">Welcome back!</h1>

          <p className="mt-2 text-sm leading-6 text-[#8190AA]">Sign in to your account to manage forms, track submissions and access your workspace.</p>
        </div>

        {/* Login Form */}
        <Form layout="vertical" onFinish={handleSubmit} className="flex flex-col gap-3">
          <TextInput name="username" type="text" label="Username" placeholder="Enter your username" required onChange={(value) => handleChange("username", value)} />

          <TextInput name="password" type="password" label="Password" placeholder="Enter your password" required onChange={(value) => handleChange("password", value)} />

          {/* Sign In Button */}
          <div className="mt-4">
            <Button
              type="submit"
              textContent={loading ? "Signing in..." : "Sign In"}
              variant="primary"
              icon={<FiLock />}
              isLoading={loading}
              disabled={loading}
              className="w-full !h-12 !rounded-lg"
            />
          </div>
        </Form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-white/70">© {new Date().getFullYear()} Dynamic Form Builder. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
