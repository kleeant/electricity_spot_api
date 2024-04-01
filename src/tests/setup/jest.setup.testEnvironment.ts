import Environment from 'jest-environment-node'
import type { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment'
import schemaNameGenerator from './jest.setup.schemaNameGen'
// const { getSchemaNamesFromTestFileName } = require('../testUtils/schemaNameGenerator')
interface CustomEnvironment extends Environment {
  testPath: string
}

class CustomEnvironment extends Environment {
  constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    this.testPath = context.testPath
  }

  async setup (): Promise<void> {
    await super.setup()
    const schema = schemaNameGenerator.getSchemaNamesFromTestFileName(this.testPath)
    this.global.process.env.DB_DATABASE = schema
  }
}
export default CustomEnvironment
