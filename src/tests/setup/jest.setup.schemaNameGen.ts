import paths from 'path'
const SCHEMA_MAX_LENGTH = 63
const separator = paths.sep

const getUniqueFileNamePart = (filePath: string, maxLength: number): string => {
  if (filePath.length === 0) {
    throw new Error('filePath was not supplied')
  }
  const parts = filePath.toLowerCase().split(separator)
  const fileName = parts[parts.length - 1]
  const [testName, testCategory] = fileName.split('.')
  if (testName.length === 0 || testCategory.length === 0) {
    throw new Error('test schema name could not be created')
  }
  const uniqueFileName = `${testName}_${testCategory}`
  return uniqueFileName.length > maxLength
    ? uniqueFileName.substring(0, maxLength)
    : uniqueFileName
}

/**
 * @description - creates unique schema names for tests.
 * Tests are run in parallel and in separate processes, which means they need unique schemas.
 */
const getSchemaNamesFromTestFileName = (filePath: string): string => {
  const namePrefix = 'api-test'
  const remainingLength = SCHEMA_MAX_LENGTH - namePrefix.length

  const uniquePart = getUniqueFileNamePart(filePath, remainingLength)
  return `${namePrefix}-${uniquePart}`
}

export default {
  getSchemaNamesFromTestFileName
}
