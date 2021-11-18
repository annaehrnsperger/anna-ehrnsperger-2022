const title = 'Client';
const apiId = 'abc';
const buildHookId = 'https://api.netlify.com/build_hooks/abc';
const name = 'client';
const url = 'https://client.de/';

export default {
  widgets: [
    {
      name: 'netlify',
      options: {
        title: 'Netlify deploys',
        sites: [
          {
            title,
            apiId,
            buildHookId,
            name,
            url,
          },
        ],
      },
    },
    { name: 'project-users', layout: { height: 'auto' } },
  ],
};

