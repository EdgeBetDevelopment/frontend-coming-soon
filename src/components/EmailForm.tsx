"use client";

import { useState } from "react";

const API_BASE = "https://kfw20jcy36.execute-api.us-east-1.amazonaws.com/Prod";

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr("Email is not correct");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/subscribe/api/v1/subscriber/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        let detail = "";
        try {
          const data = await res.json();
          detail = data?.detail || data?.message || "";
        } catch {}
        throw new Error(detail || `Error ${res.status}`);
      }

      setMsg("Success! We’ll notify you once updates are available.");
      setEmail("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backdropFilter: "blur(20px)",
        background:
          "linear-gradient(112.71deg, rgba(23, 23, 23, 0.6) 19.64%, rgba(105, 105, 105, 0.316464) 55.1%, rgba(125, 125, 125, 0.06) 92%)",
      }}
      className="w-full max-w-[600px] rounded-xl p-4 sm:p-6"
    >
      <label
        htmlFor="email"
        className="block text-sm font-manrope text-[#EBEBEB] mb-2"
      >
        Email
      </label>

      <div className="relative">
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className="
            w-full pr-36
            rounded-2xl border border-[#707070] bg-[#343434]
            font-manrope text-[#EBEBEB] placeholder:text-[#EBEBEB]/50
            h-12 sm:h-14 px-4
            focus:outline-none
          "
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="
            mt-2 w-full
            sm:mt-0 sm:w-auto
            sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2
            bg-[#84FDF7] text-black font-manrope font-semibold
            px-4 py-2 rounded-xl
            hover:bg-cyan-200 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Sending..." : "Notify me"}
        </button>
      </div>

      {msg && <p className="mt-3 text-sm text-emerald-300">{msg}</p>}
      {err && <p className="mt-3 text-sm text-red-300">{err}</p>}
    </form>
  );
};
