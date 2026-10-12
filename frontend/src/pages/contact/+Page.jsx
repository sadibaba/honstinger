import React from 'react';

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-primary px-4 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4 font-medium">Get in touch</p>
        <h1 className="font-display text-5xl sm:text-6xl text-text-primary mb-5">Contact</h1>
        <p className="text-text-secondary text-lg font-serif mb-8">
          Send the Chronica editorial team a question, correction, or story suggestion.
          You can also email us at <a className="text-accent underline" href="mailto:sadisheikh169@gmail.com">sadisheikh169@gmail.com</a>.
        </p>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="glass rounded-3xl p-6 sm:p-10 space-y-6"
        >
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
          <input type="hidden" name="subject" value="New Chronica contact message" />
          <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" />

          <div>
            <label htmlFor="contact-name" className="block text-text-primary text-sm font-medium mb-2">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-secondary/60 bg-primary/70 px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-text-primary text-sm font-medium mb-2">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-secondary/60 bg-primary/70 px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-text-primary text-sm font-medium mb-2">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              required
              className="w-full rounded-xl border border-secondary/60 bg-primary/70 px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button type="submit" className="rounded-full bg-accent px-7 py-3 font-bold text-primary transition-colors hover:bg-amber-300">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
