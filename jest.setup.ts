import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { TextEncoder } from 'util'

global.TextEncoder = TextEncoder

global.jest = jest

jest.setTimeout(60000)
