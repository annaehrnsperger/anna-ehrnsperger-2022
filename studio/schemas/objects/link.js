import { FiLink } from 'react-icons/fi';
import { pages } from '../../src/utils';

export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Page Link', value: 'pageLink' },
          { title: 'External Link', value: 'externalLink' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: pages,
      hidden: ({ parent }) => !parent?.type || parent.type !== 'pageLink',
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL',
      hidden: ({ parent }) => !parent?.type || parent.type !== 'externalLink',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: FiLink,
      };
    },
  },
};
