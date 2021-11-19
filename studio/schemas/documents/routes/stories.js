export default {
  name: 'stories',
  title: 'Stories',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Work',
      };
    },
  },
};
