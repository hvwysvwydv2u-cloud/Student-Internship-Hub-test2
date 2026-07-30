export default {
  name: 'factory',
  title: 'Factories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Factory Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'hours',
      title: 'Training Hours',
      type: 'number',
    },
    {
      name: 'departments',
      title: 'Departments',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'contact',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Stipend / Price',
      type: 'string',
    },
  ],
}
