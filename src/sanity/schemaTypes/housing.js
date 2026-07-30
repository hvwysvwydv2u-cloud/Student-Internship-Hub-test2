export default {
  name: 'housing',
  title: 'Housing',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Housing Name',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price per Month',
      type: 'string',
    },
    {
      name: 'contact',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'isComingSoon',
      title: 'Coming Soon?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
