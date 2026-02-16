import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'emailSignup',
  title: 'Email Signup',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Tour', value: 'tour' },
          { title: 'Merch', value: 'merch' }
        ]
      }
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      readOnly: true
    })
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'subscribedAtDesc',
      by: [{ field: 'subscribedAt', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      email: 'email',
      source: 'source',
      subscribedAt: 'subscribedAt'
    },
    prepare({ email, source, subscribedAt }) {
      const date = subscribedAt
        ? new Date(subscribedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        : ''
      return {
        title: email,
        subtitle: `${source || 'unknown'} · ${date}`
      }
    }
  }
})
