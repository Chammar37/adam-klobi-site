import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'single',
  title: 'Single',
  type: 'document',
  description: 'Singles — shown below the EP on the Music page in a stacked centered layout (artwork on top, text and pre-save button below).',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the single',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short text shown below the artwork (e.g. "Out now on all platforms")'
    }),
    defineField({
      name: 'artwork',
      title: 'Artwork',
      type: 'image',
      description: 'Cover art for this single',
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'link',
      title: 'Pre-save / Streaming Link',
      type: 'url',
      description: 'Where the PRE-SAVE button links to (e.g. Spotify, Apple Music, or a smartlink)'
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date'
    })
  ],
  orderings: [
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'artwork',
      date: 'releaseDate'
    },
    prepare({ title, media, date }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No release date',
        media
      }
    }
  }
})
