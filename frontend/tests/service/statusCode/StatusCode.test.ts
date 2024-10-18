import "@testing-library/jest-dom"
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'
import StatusCode from '../../../src/service/StatusCode/StatusCode'

describe("Should function statuscode", ()=> {
    const statusCode = StatusCode(100);

    expect(statusCode.status).toBe("warning")
})