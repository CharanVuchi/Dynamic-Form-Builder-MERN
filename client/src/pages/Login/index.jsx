import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, TextInput } from "src/components";
import { useToast } from "src/hooks/useToast";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const handleChange = (name, value) => {
    setLoginForm((prev) => ({ ...prev, [name]: value }));
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

      localStorage.setItem("token", "21234");

      toast.success("Signed in. (No backend configured yet.)");
      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#161F42] via-[#26345F] to-[#9CD3BB] px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-[#E5EAF2] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#161F42]">Sign In</h1>

        <p className="mt-2 text-sm text-[#718096]">Enter your username and password to continue.</p>

        <Form layout="vertical" onFinish={handleSubmit} className="flex flex-col gap-3">
          <TextInput name="username" type="text" label="Username" placeholder="Enter your username" required onChange={(value) => handleChange("username", value)} />

          <TextInput name="password" type="password" label="Password" placeholder="Enter your password" required onChange={(value) => handleChange("password", value)} />

          <Button type="submit" textContent={loading ? "Signing in..." : "Sign In"} variant="primary" isLoading={loading} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
