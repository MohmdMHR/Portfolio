import { describe, expect, it, vi } from 'vitest'
import { handleContact } from '../../server/utils/contact'

const valid = { name: 'Sara', email: 'sara@example.com', message: 'We have a role for you.', website: '' }
const config = { apiKey: 'key', to: 'to@example.com', from: 'from@example.com' }

describe('the contact form', () => {
  it('delivers a valid message and only then reports success', async () => {
    const send = vi.fn().mockResolvedValue({ ok: true })

    await expect(handleContact(valid, config, send)).resolves.toEqual({ status: 200 })
    expect(send).toHaveBeenCalledOnce()
    expect(send.mock.calls[0]?.[0]).toMatchObject({ replyTo: 'sara@example.com', to: 'to@example.com' })
  })

  it('rejects a message with no valid email and sends nothing', async () => {
    const send = vi.fn()

    await expect(handleContact({ ...valid, email: 'nope' }, config, send)).resolves.toEqual({ status: 422 })
    expect(send).not.toHaveBeenCalled()
  })

  it('reports failure when the provider refuses', async () => {
    const send = vi.fn().mockResolvedValue({ ok: false })

    await expect(handleContact(valid, config, send)).resolves.toEqual({ status: 502 })
  })

  it('reports failure when the provider throws', async () => {
    const send = vi.fn().mockRejectedValue(new Error('network'))

    await expect(handleContact(valid, config, send)).resolves.toEqual({ status: 502 })
  })

  it('reports failure when email is not configured, never a fake success', async () => {
    const send = vi.fn()

    await expect(handleContact(valid, { ...config, apiKey: '' }, send)).resolves.toEqual({ status: 503 })
    expect(send).not.toHaveBeenCalled()
  })

  it('quietly drops a bot that fills the hidden field', async () => {
    const send = vi.fn()

    await expect(handleContact({ ...valid, website: 'spam.example' }, config, send)).resolves.toEqual({ status: 200 })
    expect(send).not.toHaveBeenCalled()
  })
})
