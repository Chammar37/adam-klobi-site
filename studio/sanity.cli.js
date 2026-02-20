import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'l233r8fw',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  },
  deployment: {
    appId: 'k1m5rmb5f6qppfvl3cgfumia',
  },
})
