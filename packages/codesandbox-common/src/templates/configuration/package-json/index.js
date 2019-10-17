import slugify from '../../../utils/slugify'

export function generateFileFromSandbox(sandbox) {
  const jsonFile = {
    name: slugify(sandbox.title || sandbox.id),
    version: '1.0.0',
    description: sandbox.description || '',
    keywords: sandbox.tags,
    main: sandbox.entry,
    dependencies: sandbox.npmDependencies,
  }
  return JSON.stringify(jsonFile, null, 2)
}

const config = {
  title: 'package.json',
  type: 'package',
  description: 'Describes the overall configuration of your project.',
  moreInfoUrl: 'https://docs.npmjs.com/files/package.json',
  generateFileFromSandbox,
  schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/package.json',
}
export default config
