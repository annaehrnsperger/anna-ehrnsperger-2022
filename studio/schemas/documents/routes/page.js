import { FiLayout } from 'react-icons/fi';

const name = 'page';
const title = 'Page';
const icon = FiLayout;

export default {
  type: 'document',
  name,
  title,
  icon,
  initialValue: {
    title,
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'portableText',
      title: 'Description',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Is a unique part at the end of the URL, e.g. mywebsite.com/my-page',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      previewTitle: 'title',
      subtitle: 'slug.current',
    },
    prepare({ previewTitle, subtitle }) {
      return {
        title: previewTitle,
        subtitle: `/${subtitle}`,
        media: icon,
      };
    },
  },
};
