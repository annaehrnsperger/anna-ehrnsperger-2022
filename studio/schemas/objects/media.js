import { FiFileText, FiTv } from 'react-icons/fi';

export default {
  title: 'Media',
  name: 'media',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      hidden: ({ parent }) => !parent?.type || parent.type !== 'image',
    },
    {
      name: 'video',
      type: 'mainVideo',
      title: 'Video',
      hidden: ({ parent }) => !parent?.type || parent.type !== 'video',
    },
  ],
  preview: {
    select: {
      title: 'image.alt',
      image: 'image.image.asset',
      media: 'type',
    },
    prepare({ title, image, media }) {
      return {
        title: media === 'image' ? title : 'Video',
        media: media === 'image' ? image : FiTv,
      };
    },
  },
};
