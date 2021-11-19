import { FiSmile } from 'react-icons/fi';

const name = 'about';
const title = 'About';
const icon = FiSmile;

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
