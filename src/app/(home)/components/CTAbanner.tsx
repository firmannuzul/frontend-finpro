export function CTAbanner() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl bg-[#5E3BEE] px-8 py-14 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
            Start Recruiting Now
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/70">
            {"Let's get ready to take your recruitment efforts to the next level! Our platform offers a powerful and efficient way to get your job listings in front of top talent."}
          </p>
          <button
            type="button"
            className="mt-8 rounded-xl bg-card px-8 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            Post a Job
          </button>
        </div>
      </div>
    </section>
  )
}
