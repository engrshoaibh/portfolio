export async function POST(req) {
  try {
    const body = await req.json()
    // Basic validation
    const { name, email, company, budget, timeline, message } = body || {}
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), { status: 400 })
    }

    // For now, just log. You can integrate with email service (Resend, SendGrid) later.
    console.log('New contact message:', { name, email, company, budget, timeline, message })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), { status: 500 })
  }
}


