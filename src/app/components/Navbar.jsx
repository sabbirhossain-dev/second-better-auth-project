"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  console.log("session: ", session);

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-white/15"
          aria-current="page"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/features"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
        >
          Features
        </Link>
      </li>

      <li>
        <Link
          href="#"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
        >
          Dashboard
        </Link>
      </li>

      <li>
        <Link
          href="#"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
        >
          Pricing
        </Link>
      </li>
    </>
  );

  const navButtons = (
    <>
      {session ? (
        <div className="flex items-center gap-3">
          {/* User */}
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
              {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="leading-tight">
              <p className="text-[11px] text-slate-400">Welcome</p>
              <p className="max-w-28 truncate text-sm font-semibold text-white">
                Mr. {session.user?.name}
              </p>
            </div>
          </div>

          {/* Mobile / Simple user name */}
          <p className="text-sm font-medium text-white sm:hidden">
            {session.user?.name}
          </p>

          {/* Logout */}
          <Button
            onClick={async () => {
              (await signOut(), router.push("/sign-in"));
            }}
            className="h-9 rounded-lg border border-red-400/20 bg-red-500/10 px-4 text-sm font-medium text-red-400 transition-all hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300"
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {/* Login */}
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
            Login
          </Link>

          {/* Sign Up */}
          <Link href="/sign-up">
            <Button className="h-10 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1b2221] shadow-lg shadow-black/5 backdrop-blur-xl">
      <header className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>

            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-black text-white shadow-lg shadow-indigo-500/20">
              H
            </div>

            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-tight text-white">
                HOME
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Workspace
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">{navLinks}</ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center md:flex">{navButtons}</div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#171d1c] px-4 pb-5 pt-4 shadow-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks}

            <li className="mt-4 border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">{navButtons}</div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
