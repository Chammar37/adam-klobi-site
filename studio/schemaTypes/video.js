import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full YouTube video URL (e.g. https://www.youtube.com/watch?v=abc123)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this video prominently',
      initialValue: false
    })
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt'
    },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date'
      }
    }
  }
})
