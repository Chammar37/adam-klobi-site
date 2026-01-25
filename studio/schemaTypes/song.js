import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'artwork',
      title: 'Artwork',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date'
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url'
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url'
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url'
    }),
    defineField({
      name: 'soundcloudUrl',
      title: 'SoundCloud URL',
      type: 'url'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this song prominently on the site',
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
