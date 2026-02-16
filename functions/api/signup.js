export async function onRequestPost(context) {
  const { env } = context

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  try {
    const { email, source } = await context.request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers,
      })
    }

    const projectId = env.SANITY_PROJECT_ID || 'l233r8fw'
    const dataset = env.SANITY_DATASET || 'production'
    const token = env.SANITY_WRITE_TOKEN

    if (!token) {
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
        status: 500,
        headers,
      })
    }

    const doc = {
      _type: 'emailSignup',
      email,
      source: source || 'unknown',
      subscribedAt: new Date().toISOString(),
    }

    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mutations: [{ create: doc }],
        }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('Sanity error:', text)
      return new Response(JSON.stringify({ error: 'Failed to save' }), {
        status: 500,
        headers,
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    })
  } catch (err) {
    console.error('Signup error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers,
    })
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
