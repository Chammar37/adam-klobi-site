import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'merchItem',
  title: 'Merch Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
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
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in USD',
      validation: (Rule) => Rule.required().positive()
    }),
    defineField({
      name: 'shopifyProductId',
      title: 'Shopify Product ID',
      type: 'string',
      description: 'The Shopify product variant ID for checkout'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this item prominently',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      media: 'image'
    },
    prepare({ title, price, media }) {
      return {
        title,
        subtitle: price ? `$${price.toFixed(2)}` : 'No price set',
        media
      }
    }
  }
})
