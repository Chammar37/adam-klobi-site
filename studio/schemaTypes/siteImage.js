import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteImage',
  title: 'Site Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where on the site this image appears (hero, about, background, etc.)',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'About Section', value: 'about' },
          { title: 'Background', value: 'background' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Footer', value: 'footer' }
        ]
      }
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility'
    })
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      media: 'image'
    },
    prepare({ title, location, media }) {
      return {
        title,
        subtitle: location || 'No location set',
        media
      }
    }
  }
})
