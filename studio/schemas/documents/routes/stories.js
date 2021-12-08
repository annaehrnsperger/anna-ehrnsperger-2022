export default {
  name: 'stories',
  title: 'Stories',
  type: 'document',
  fields: [
    {
      name: 'stories',
      title: 'Stories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
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
