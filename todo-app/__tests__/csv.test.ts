import { describe, it, expect } from 'vitest'
import { csvEscape } from '@/lib/csv'

describe('csvEscape', () => {
  it('returns the value unchanged when no special characters', () => {
    expect(csvEscape('hello')).toBe('hello')
  })

  it('wraps value in quotes when it contains a comma', () => {
    expect(csvEscape('hello, world')).toBe('"hello, world"')
  })

  it('doubles internal quotes and wraps in quotes', () => {
    expect(csvEscape('say "hi"')).toBe('"say ""hi"""')
  })

  it('returns empty string for null or undefined', () => {
    expect(csvEscape(null)).toBe('')
    expect(csvEscape(undefined)).toBe('')
  })
})
