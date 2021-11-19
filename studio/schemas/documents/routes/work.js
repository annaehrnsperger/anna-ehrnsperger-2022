export default {
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
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
