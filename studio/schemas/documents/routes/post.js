import { FiSidebar } from 'react-icons/fi';

const name = 'post';
const title = 'Post';
const icon = FiSidebar;

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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
  ],
  preview: {
    select: {
      previewTitle: 'title',
      media: 'mainImage',
    },
    // prepare() {
    //   return {
    //     title,
    //   };
    // },
  },
};
