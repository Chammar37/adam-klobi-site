import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tourDate',
  title: 'Tour Date',
  type: 'document',
  fields: [
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url'
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional info (support acts, special event, etc.)'
    })
  ],
  orderings: [
    {
      title: 'Date, Ascending',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    },
    {
      title: 'Date, Descending',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      venue: 'venue',
      city: 'city',
      country: 'country',
      date: 'date',
      soldOut: 'soldOut'
    },
    prepare({ venue, city, country, date, soldOut }) {
      const dateStr = date
        ? new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        : 'TBA'

      return {
        title: `${venue} - ${city}, ${country}`,
        subtitle: `${dateStr}${soldOut ? ' (SOLD OUT)' : ''}`
      }
    }
  }
})
