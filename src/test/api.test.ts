import fetch from 'node-fetch'

describe('happy path tests', () => {
  jest.setTimeout(60_000)

  test('hello world', async () => {
    const response = await fetch('http://localhost:3000/')
    const responseText = await response.text()

    expect(response.status).toBe(200)
    expect(responseText).toBe('Hello World!')
  })

  test('trace http request', async () => {
    const response = await fetch('http://localhost:3000/trace-http-request')
    const responseJson = await response.json()

    expect(response.status).toBe(200)
    expect(responseJson).toBeTruthy()
  })

  test('trace mysql query', async () => {
    const response = await fetch('http://localhost:3000/trace-mysql-access')
    const responseJson = await response.json()

    expect(response.status).toBe(200)
    expect(responseJson).toBeTruthy()
  })

  test('trace pg query', async () => {
    const response = await fetch('http://localhost:3000/trace-pg-access')
    const responseJson = await response.json()

    expect(response.status).toBe(200)
    expect(responseJson).toBeTruthy()
  })

  test('trace error', async () => {
    const response = await fetch('http://localhost:3000/trace-error')
    const responseText = await response.text()

    expect(response.status).toBe(500)
    expect(responseText).toBe('Internal Server Error')
  })
})
