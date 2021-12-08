import { FiSquare } from 'react-icons/fi';
import { modules } from '../../../src/utils';

const name = 'post';
const title = 'Post';
const icon = FiSquare;

export default {
  type: 'document',
  name,
  title,
  icon,
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
      name: 'media',
      title: 'Media',
      type: 'media',
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
      };
    },
  },
};
