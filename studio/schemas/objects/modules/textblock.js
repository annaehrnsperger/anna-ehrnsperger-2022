import { FiType } from 'react-icons/fi';

export default {
  title: 'Textblock',
  name: 'textblock',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    {
      title: 'Left?',
      name: 'left',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content[0].children[0].text',
    },
    prepare({ title, content }) {
      return {
        title: title || content,
        media: FiType,
      };
    },
  },
};
