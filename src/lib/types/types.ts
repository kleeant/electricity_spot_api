import { components } from './generated'

export type TApiTestDbo = components['schemas']['TApiTest'] & { id: number }
export type TApiTest = components['schemas']['TApiTest']
export type TCreateApiTest = components['schemas']['TCreateApiTest']
export type TCreateApiTestDbo = components['schemas']['TCreateApiTest']
export type TApiError = components['schemas']['Error']
