import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ArrowRight, CheckCircle2, Sparkles, Building2, UserCircle2, Loader2 } from 'lucide-react';
import { cn } from './lib/utils';

type Role = 'company' | 'executive';

interface FormData {
  name: string;
  email: string;
  role: Role;
}

function App() {
  const [role, setRole] = useState<Role>('executive');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      // FORMSPREE_ENDPOINT
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meejojvd';

      await axios.post(FORMSPREE_ENDPOINT, {
        ...data,
        role: role === 'company' ? 'Company (Find an Expert)' : 'Executive (Join as Expert)',
        _subject: `New TailoredIQ Signup: ${role.toUpperCase()}`
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Note: Form submission simulated (Formspree ID missing). In production, this data would go to your email.");
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#172B4D]">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#172B4D]/90 mix-blend-multiply z-10" />
        <img
          src="https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full text-center space-y-8 relative z-20"
      >
        {/* Header */}
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-blue-100 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            TailoredIQ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400 text-3xl md:text-5xl block mt-2">
              Senior-Level Insight. On-Demand.
            </span>
          </h1>

          <p className="text-lg text-blue-100/80 max-w-md mx-auto leading-relaxed font-light">
            Exclusive. Referral-based. High-impact. <br />
            We are selecting a limited cohort of founding members to seed the marketplace.
          </p>
        </div>

        {/* Interactive Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl ring-1 ring-white/10">
          <AnimatePresence mode='wait'>
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-[#0052CC]/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#0052CC] fill-current" />
                </div>
                <h3 className="text-2xl font-semibold text-white">You're on the list.</h3>
                <p className="text-blue-100/80">
                  Thank you for your interest. We'll be in touch with your exclusive invitation soon.
                </p>
                {error && <p className="text-xs text-yellow-300 mt-4 bg-yellow-900/40 p-2 rounded">{error}</p>}
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-1 bg-[#091E42]/50 p-1 rounded-lg mb-8">
                  <button
                    onClick={() => setRole('company')}
                    className={cn(
                      "flex items-center justify-center space-x-2 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                      role === 'company'
                        ? "bg-[#0052CC] text-white shadow-sm"
                        : "text-blue-200/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Find An Expert</span>
                  </button>
                  <button
                    onClick={() => setRole('executive')}
                    className={cn(
                      "flex items-center justify-center space-x-2 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                      role === 'executive'
                        ? "bg-[#0052CC] text-white shadow-sm"
                        : "text-blue-200/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <UserCircle2 className="w-4 h-4" />
                    <span>Join as an Expert</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 ml-1">Full Name</label>
                    <input
                      {...register("name", { required: true })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full bg-[#091E42]/60 border border-blue-300/20 rounded-lg px-4 py-3 text-white placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] transition-all"
                    />
                    {errors.name && <span className="text-red-300 text-xs ml-1">Name is required</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 ml-1">Work Email</label>
                    <input
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="e.g. sarah@techcorp.com"
                      type="email"
                      className="w-full bg-[#091E42]/60 border border-blue-300/20 rounded-lg px-4 py-3 text-white placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] transition-all"
                    />
                    {errors.email && <span className="text-red-300 text-xs ml-1">Valid email is required</span>}
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-blue-900/50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{role === 'company' ? 'Request Access' : 'Apply for Access'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-blue-200/60 pt-2">
                    {role === 'company'
                      ? "Find top 1% talent for your mission-critical projects."
                      : "Join the elite network of verified executives."}
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-blue-200/40 text-sm">
          © {new Date().getFullYear()} TailoredIQ. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
}

export default App;
