'use client'

import { useState } from 'react'
import TextSplit from './TextSplit'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [status, setStatus] = useState({ submitting: false, ok: null, error: '' })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus({ submitting: false, ok: false, error: 'Please fill required fields.' })
      return
    }
    const emailOk = /.+@.+\..+/.test(form.email)
    if (!emailOk) {
      setStatus({ submitting: false, ok: false, error: 'Enter a valid email.' })
      return
    }
    setStatus({ submitting: true, ok: null, error: '' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus({ submitting: false, ok: true, error: '' })
      setForm({ name: '', email: '', company: '', budget: '', timeline: '', message: '' })
    } catch (err) {
      setStatus({ submitting: false, ok: false, error: 'Something went wrong. Try again.' })
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 md:px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold relative z-10">
        <TextSplit text="Let’s build your product" />
      </h2>
      <p className="mt-3 text-gray-300">Tell me about your startup or project—I'll get back within 24 hours.</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name*</label>
              <input value={form.name} onChange={update('name')} required placeholder="Your name" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email*</label>
              <input type="email" value={form.email} onChange={update('email')} required placeholder="you@company.com" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Company / Startup</label>
              <input value={form.company} onChange={update('company')} placeholder="Company name" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Budget</label>
              <select value={form.budget} onChange={update('budget')} className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-orange-400">
                <option value="">Select budget</option>
                <option value="< $1k">Less than $1k</option>
                <option value="$1k - $5k">$1k - $5k</option>
                <option value="$5k - $10k">$5k - $10k</option>
                <option value="> $10k">More than $10k</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Timeline</label>
              <input value={form.timeline} onChange={update('timeline')} placeholder="E.g., 4-6 weeks" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-orange-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Project details*</label>
              <textarea value={form.message} onChange={update('message')} required rows={5} placeholder="What are we building? Key features, goals, links..." className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-orange-400" />
            </div>
          </div>

          {status.error && <div className="mt-4 text-sm text-red-400">{status.error}</div>}
          {status.ok && <div className="mt-4 text-sm text-green-400">Thanks! I’ll reply shortly.</div>}

          <button disabled={status.submitting} type="submit" className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2.5 font-semibold text-white shadow-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 disabled:opacity-60">
            {status.submitting ? 'Sending…' : 'Send message'}
          </button>
          <div className="mt-3 text-xs text-gray-400">By submitting, you agree to be contacted about your project.</div>
        </form>

        <div className="space-y-4">
          <a href="mailto:engrshoaibhassan@gmail.com" className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
            <div className="text-sm text-gray-400">Email</div>
            <div className="text-lg">engrshoaibhassan@gmail.com</div>
          </a>
          <a href="https://linkedin.com/in/engrshoaibhassan" target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
            <div className="text-sm text-gray-400">LinkedIn</div>
            <div className="text-lg">linkedin.com/in/engrshoaibhassan</div>
          </a>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-gray-400">Availability</div>
            <div className="text-lg">Open for new projects</div>
          </div>
        </div>
      </div>
    </section>
  )
}


