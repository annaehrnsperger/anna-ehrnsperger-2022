export default {
  title: 'SEO Metadata',
  name: 'seo',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (Rule) => [
        Rule.min(50)
          .max(160)
          .warning('Description should be 50–160 characters'),
      ],
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
  ],
};

// {
//   title: 'SEO',
//   name: 'seo',
//   type: 'seo',
//   options: { collapsible: true, collapsed: true },
//   initialValue: {
//     title,
//   },
// },
