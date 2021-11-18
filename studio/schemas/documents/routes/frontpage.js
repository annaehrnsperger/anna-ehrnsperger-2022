import { FiLayout } from 'react-icons/fi';

const name = 'frontpage';
const title = 'Frontpage';
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
      name: 'lang',
      type: 'localeString',
      title: 'Lang',
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'media',
      type: 'media',
      title: 'Media',
    },
    {
      name: 'video',
      type: 'mux.video',
      title: 'Video',
    },
  ],
  preview: {
    select: {
      previewTitle: 'title',
    },
    prepare({ previewTitle }) {
      return {
        title: previewTitle,
        media: icon,
      };
    },
  },
};
