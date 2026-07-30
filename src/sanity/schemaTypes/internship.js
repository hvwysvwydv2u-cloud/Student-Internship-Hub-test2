export default {
  name: 'internship',
  title: 'Internship Opportunities',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Opportunity Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'factory',
      title: 'Factory',
      type: 'reference',
      to: [{ type: 'factory' }],
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
      name: 'price',
      title: 'Stipend / Price',
      type: 'string',
    },
    {
      name: 'departments',
      title: 'Departments',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
