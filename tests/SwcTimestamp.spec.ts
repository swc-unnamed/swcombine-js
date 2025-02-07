import SwcTimestamp from '../src/classes/SwcTimestamp'
import { describe, it, expect } from 'vitest'

describe('SWCTimestampTests', () => {
  it('should convert from SWC time to unix time', () => {
    //arrange
    const subject = new SwcTimestamp(25, 60, 12, 15, 41)
    const subject2 = new SwcTimestamp(25, 204, 5)

    //act
    const result = subject.toUnixTimestamp('seconds')
    const result2 = subject2.toUnixTimestamp('milliseconds')

    //assert
    expect(result).to.equal(1706210141)
    expect(result2).to.equal(1718625600000)
  })

  it('should convert from SWC time to JS date object', () => {
    //arrange
    const subject = new SwcTimestamp(25, 190, 16, 23, 41)

    //act
    const result = subject.toDate()

    //assert
    expect(result.getTime()).to.equal(1717457021000)
  })

  it('converts from unix time to an SWC timestamp', () => {
    //arrange
    const unixTimestamp = 1640121912

    //act
    const result = SwcTimestamp.fromUnixTimestamp(unixTimestamp)

    //assert
    expect(result.year).to.equal(23)
    expect(result.day).to.equal(25)
    expect(result.hour).to.equal(14)
    expect(result.minute).to.equal(25)
    expect(result.second).to.equal(12)
  })

  it('can parse a unix timestamp in milliseconds into an SWC timestamp', () => {
    //arrange
    const unixTimestampMs = 1686347679374

    //act
    const result = SwcTimestamp.fromUnixTimestamp(unixTimestampMs)

    //assert
    expect(result.year).to.equal(24)
    expect(result.day).to.equal(195)
    expect(result.hour).to.equal(14)
    expect(result.minute).to.equal(54)
    expect(result.second).to.equal(39)
  })

  it('can parse a Date object into an SWC timestamp', () => {
    //arrange
    const date = new Date(2024, 0, 1)

    //act
    const result = SwcTimestamp.fromDate(date)

    //assert
    expect(result.year).to.equal(25)
    expect(result.day).to.equal(35)
    expect(result.hour).to.equal(16)
    expect(result.minute).to.equal(0)
    expect(result.second).to.equal(0)
  })
})
