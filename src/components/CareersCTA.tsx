"use client";

import React, { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Check, FileUp, Send, X } from "lucide-react";

const roleOptions = [
  "Client Servicing",
  "Event Operations",
  "Creative Design",
  "Business Development",
  "MIS / Data Support",
  "Open Application",
];

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function CareersCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeName, setResumeName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const closeModal = () => {
    if (status !== "submitting") {
      setIsOpen(false);
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "We could not send your application. Please try again.");
      }

      formRef.current?.reset();
      setResumeName("");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "We could not send your application. Please try again.");
    }
  };

  return (
    <section className="relative px-6 pb-24 pt-4 md:px-8 md:pb-24">
      <div className="mx-auto max-w-6xl border-t border-white/[0.08] pt-12 md:pt-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Careers at Grey Promos</p>
            <h2 className="text-4xl font-display font-bold leading-[0.98] md:text-6xl">
              Bring your next <span className="text-gradient">big idea</span> to life with us.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              We are always interested in people who are curious, capable, and ready to make brand experiences happen.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-black shadow-xl shadow-white/10 transition-colors hover:bg-accent hover:text-white"
          >
            <BriefcaseBusiness size={18} strokeWidth={2} />
            Get Hired
            <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 px-3 pb-3 pt-24 backdrop-blur-md md:items-center md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="careers-form-title"
              data-lenis-prevent
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[calc(100dvh-6.75rem)] w-full max-w-3xl touch-pan-y overflow-y-auto overscroll-contain rounded-[1.5rem] border border-white/[0.12] bg-[#0b0b0c]/95 shadow-2xl shadow-black/60 backdrop-blur-2xl md:max-h-[min(44rem,calc(100dvh-10rem))]"
            >
              <button
                type="button"
                onClick={closeModal}
                disabled={status === "submitting"}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed"
                aria-label="Close application form"
              >
                <X size={18} />
              </button>

              <div className="p-6 sm:p-9 md:p-12">
                {status === "success" ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                      <Check size={29} />
                    </span>
                    <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Application received</p>
                    <h2 id="careers-form-title" className="mt-4 text-4xl font-display font-bold">Thank you for reaching out.</h2>
                    <p className="mx-auto mt-4 max-w-md text-muted">Your details and resume are with our hiring team. We will be in touch if there is a fitting opportunity.</p>
                    <button type="button" onClick={closeModal} className="mt-8 rounded-full border border-white/15 px-5 py-3 text-sm font-bold transition-colors hover:border-accent hover:text-accent">Close</button>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Join the team</p>
                    <h2 id="careers-form-title" className="mt-4 max-w-xl text-4xl font-display font-bold leading-tight md:text-5xl">Tell us what you would bring to the table.</h2>
                    <p className="mt-4 max-w-xl text-muted">Share a few details and your resume. It takes about two minutes.</p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-9 space-y-7">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Full name"><input name="name" required autoComplete="name" placeholder="Your name" className="career-input" /></Field>
                        <Field label="Email address"><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="career-input" /></Field>
                        <Field label="Phone number"><input name="phone" required autoComplete="tel" placeholder="+91 ..." className="career-input" /></Field>
                        <Field label="City"><input name="city" required autoComplete="address-level2" placeholder="Where are you based?" className="career-input" /></Field>
                      </div>

                      <Field label="I am interested in">
                        <select name="role" required defaultValue="" className="career-input career-select">
                          <option value="" disabled>Select an area</option>
                          {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
                        </select>
                      </Field>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Experience"><input name="experience" required placeholder="e.g. 2 years" className="career-input" /></Field>
                        <Field label="Availability"><input name="availability" required placeholder="e.g. Immediately / 30 days" className="career-input" /></Field>
                      </div>

                      <Field label="A note for the hiring team">
                        <textarea name="message" required rows={3} placeholder="What kind of work are you most excited to do?" className="career-input resize-none" />
                      </Field>

                      <div>
                        <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted/70">Resume <span className="text-accent">*</span></label>
                        <label className="group flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/20 bg-white/[0.025] px-5 py-4 transition-colors hover:border-accent/60 hover:bg-accent/[0.05]">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.08] text-white/80 transition-colors group-hover:bg-accent group-hover:text-white"><FileUp size={18} /></span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-white/90">{resumeName || "Upload your resume"}</span>
                            <span className="mt-1 block text-xs text-muted">PDF, DOC, or DOCX. Maximum 5 MB.</span>
                          </span>
                          <input name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={(event) => setResumeName(event.target.files?.[0]?.name || "")} />
                        </label>
                      </div>

                      {status === "error" && <p role="alert" className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{errorMessage}</p>}

                      <div className="flex flex-col justify-between gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
                        <p className="max-w-sm text-xs leading-relaxed text-muted/70">By applying, you agree that Grey Promos may contact you regarding relevant opportunities.</p>
                        <button type="submit" disabled={status === "submitting"} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-accent hover:text-white disabled:cursor-wait disabled:opacity-70">
                          {status === "submitting" ? "Sending application..." : "Submit application"}
                          <Send size={16} />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted/70">{label}</span>{children}</label>;
}
