export default {
  name: 'overviewPage',
  title: 'Overview Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'posts',
      title: 'Posts',
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
        title: 'Overview Page',
      };
    },
  },
};
