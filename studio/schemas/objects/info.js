import { FiFileText } from 'react-icons/fi';

export default {
  title: 'Info',
  name: 'info',
  type: 'object',
  fields: [
    {
      name: 'what',
      type: 'string',
      title: 'What',
    },
    {
      name: 'item',
      title: 'Item',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'what',
    },
    prepare({ title }) {
      return {
        title,
        media: FiFileText,
      };
    },
  },
};
