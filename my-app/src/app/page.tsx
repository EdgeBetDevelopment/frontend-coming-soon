"use client";

import { useState } from "react";
import {
  Zap,
  TrendingUp,
  Brain,
  Target,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import edgebetLogo from "@/assets/edgebet-logo.png";

const API_BASE = "https://ndxrby9m5a.execute-api.us-east-1.amazonaws.com/Prod";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);

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

      toast.success("You're on the list! We'll notify you when we launch.");
      setEmail("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced models analyze thousands of data points to find value bets",
    },
    {
      icon: Target,
      title: "Daily Pick of the Day",
      description: "Our top-confidence play delivered to you every single day",
    },
    {
      icon: BarChart3,
      title: "Bet Tracker",
      description:
        "Track your bets, monitor your bankroll, and analyze your performance",
    },
    {
      icon: TrendingUp,
      title: "Player & Team Insights",
      description:
        "Deep-dive analytics on players and teams across all major sports",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[600px] bg-gradient-to-l from-primary/10 to-transparent" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <img src={edgebetLogo.src} alt="EdgeBet" className="h-8 md:h-10" />
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 pt-12 md:pt-24 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Launching Soon
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4 mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Predict. Bet. <span className="text-primary">Win.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transforming sports betting from a game of chance, to a
              data-driven investment strategy.
            </p>
          </div>

          {/* Email signup card */}
          <div className="p-8 rounded-2xl bg-card border border-border relative overflow-hidden max-w-md mx-auto mb-16">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Get Early Access
                </h2>
                <p className="text-muted-foreground">
                  We&apos;ll only use your email for launch updates. Unsubscribe
                  anytime.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <div className="flex max-[500px]:flex-col gap-3">
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-secondary border-border"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 max-[500px]:w-full"
                    >
                      {isSubmitting ? "..." : "Notify me"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid max-[500px]:grid-cols-1 grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group text-left"
              >
                <feature.icon className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} EdgeBet. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Sports betting involves risk. Please bet responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
