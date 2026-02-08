import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'release',
  title: 'Hero Album',
  type: 'document',
  description: 'Hero album — shown at the top of the Music page in a large side-by-side layout (artwork on the right, text + pre-save button on the left).',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the EP or album',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short text shown next to the artwork (e.g. "New EP out now" or info about the project)'
    }),
    defineField({
      name: 'artwork',
      title: 'Artwork',
      type: 'image',
      description: 'Cover art for this EP / album',
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
    }),
    defineField({
      name: 'supportingImage',
      title: 'Supporting Image',
      type: 'image',
      description: 'Image displayed beneath the hero artwork (e.g. song list, tracklist visual)',
      options: { hotspot: true }
    }),
    defineField({
      name: 'latest',
      title: 'Featured on Music Page',
      type: 'boolean',
      description: 'Turn ON to show this at the top of the Music page. Only one should be active at a time.',
      initialValue: false
    })
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
