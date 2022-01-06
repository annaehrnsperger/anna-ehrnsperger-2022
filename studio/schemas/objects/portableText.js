import { FiGlobe, FiLink } from 'react-icons/fi';

export default {
  title: 'Portable Text',
  name: 'portableText',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'pageLink',
            type: 'object',
            title: 'Page Link',
            icon: FiLink,
            fields: [
              {
                name: 'pageSlug',
                type: 'string',
                title: 'Slug',
              },
            ],
          },
          {
            name: 'externalLink',
            type: 'object',
            title: 'External Link',
            icon: FiGlobe,
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    },
  ],
};
