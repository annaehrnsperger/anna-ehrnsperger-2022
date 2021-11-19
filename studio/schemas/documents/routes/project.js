import { FiSidebar, FiSquare } from 'react-icons/fi';

const name = 'project';
const title = 'Project';
const icon = FiSidebar;

export default {
  type: 'document',
  name,
  title,
  icon,
  fields: [
    {
      name: 'type',
      type: 'string',
      title: 'Type',
    },
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
      name: 'url',
      type: 'string',
      title: 'URL',
    },
    {
      title: 'Preview Size',
      name: 'previewSize',
      type: 'string',
      options: {
        list: [
          { title: 'Square', value: 'square' },
          { title: '16:9', value: 'sixteentonine' },
          { title: '4:3', value: 'fourtothree' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'media',
      title: 'Media',
      type: 'media',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'infos',
      title: 'Infos',
      type: 'array',
      of: [{ type: 'info' }],
    },
    {
      name: 'tech',
      title: 'Tech',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'Grid',
      name: 'grid',
      type: 'string',
      options: {
        list: [
          { title: '3 large', value: 'threelarge' },
          { title: '3 small', value: 'threesmall' },
          { title: '2', value: 'two' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'medias',
      title: 'Medias',
      type: 'array',
      of: [{ type: 'media' }],
    },
  ],
  preview: {
    select: {
      previewTitle: 'title',
    },
    prepare({ previewTitle }) {
      return {
        title: previewTitle,
        media: FiSquare,
      };
    },
  },
};
