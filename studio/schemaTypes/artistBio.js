import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'artistBio',
  title: 'Artist Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text biography'
    }),
    defineField({
      name: 'pressPhoto',
      title: 'Primary Press Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'pressPhotos',
      title: 'Additional Press Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url'
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'url'
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        }),
        defineField({
          name: 'spotify',
          title: 'Spotify',
          type: 'url'
        }),
        defineField({
          name: 'appleMusic',
          title: 'Apple Music',
          type: 'url'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'pressPhoto'
    }
  }
})
