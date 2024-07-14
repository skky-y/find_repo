import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        method: 'POST',
        headers: {
          'User-Agent': 'hello',
          Authorization: `bearer ${import.meta.env.VITE_GH_TOKEN}`,
        },
      },
    },
  ],
  documents: ['src/apollo/graphql/**/*.{ts,tsx}'],
  generates: {
    './src/apollo/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
