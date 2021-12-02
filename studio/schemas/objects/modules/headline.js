import { FiMinus } from 'react-icons/fi';

export default {
  title: 'Headline',
  name: 'headline',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'portableText',
    },
  ],
  preview: {
    select: {
      title: 'headline[0].children[0].text',
    },
    prepare({ title }) {
      return {
        title,
        media: FiMinus,
      };
    },
  },
};
