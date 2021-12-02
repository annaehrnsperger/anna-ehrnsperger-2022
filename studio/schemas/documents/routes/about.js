import { FiSmile } from 'react-icons/fi';
import { modules } from '../../../src/utils';

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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: modules,
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
