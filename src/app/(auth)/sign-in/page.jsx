"use client";

import { signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      console.log("Sign in error:", error);
      return;
    }

    console.log("Sign in successful:", resData);

    router.push("/");
  };

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4">
      <div className="mt-5 w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl border border-gray-300/70 bg-white/80 p-6 shadow-2xl shadow-indigo-200/40 backdrop-blur-xl sm:p-8">
          {/* Header */}
          <div className="mb-5 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="mb-2 text-sm font-semibold text-slate-700">
                Email address
              </Label>

              <Input
                placeholder="john@example.com"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />

              <FieldError className="mt-1 text-sm text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >
              {/* Label + Forgot Password */}
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-sm font-semibold text-slate-700">
                  Password
                </Label>

                <button
                  type="button"
                  className="text-xs font-medium text-indigo-600 transition hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>

              {/* Password Input + Eye */}
              <InputGroup className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-full w-full border-0 bg-transparent px-4 text-slate-900 outline-none focus:ring-0"
                />

                <InputGroup.Suffix className="pe-2">
                  <Button
                    type="button"
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible((prev) => !prev)}
                    className="text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              <Description className="mt-2 text-xs leading-5 text-slate-400">
                At least 8 characters with 1 uppercase letter and 1 number.
              </Description>

              <FieldError className="mt-1 text-sm text-red-500" />
            </TextField>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-sm text-slate-500"
              >
                Remember me
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl"
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-medium text-slate-400">OR</span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>
          </Form>

          {/* Footer */}
          <p className="mt-7 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create an account
            </a>
          </p>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-slate-400">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
