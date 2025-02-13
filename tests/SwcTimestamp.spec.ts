import { SwcTimestamp } from '../src/timestamps/SwcTimestamp'
import { describe, it, expect } from 'vitest'

describe('SWCTimestampTests', () => {
  it('should convert from SWC time to unix time', () => {
    //arrange
    const subject = new SwcTimestamp({ year: 25, day: 60, hour: 12, minute: 15, second: 41 })
    const subject2 = new SwcTimestamp({ year: 25, day: 204, hour: 5 })

    //act
    const result = subject.toUnixTimestamp('seconds')
    const result2 = subject2.toUnixTimestamp('milliseconds')

    //assert
    expect(result).to.equal(1706210141)
    expect(result2).to.equal(1718625600000)
  })

  it('should convert from SWC time to JS date object', () => {
    //arrange
    const subject = new SwcTimestamp({ year: 25, day: 190, hour: 16, minute: 23, second: 41 })

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
    expect(result.getYear()).to.equal(23)
    expect(result.getDay()).to.equal(25)
    expect(result.getHour()).to.equal(14)
    expect(result.getMinute()).to.equal(25)
    expect(result.getSecond()).to.equal(12)
  })

  it('can parse a unix timestamp in milliseconds into an SWC timestamp', () => {
    //arrange
    const unixTimestampMs = 1686347679374

    //act
    const result = SwcTimestamp.fromUnixTimestamp(unixTimestampMs)

    //assert
    expect(result.getYear()).to.equal(24)
    expect(result.getDay()).to.equal(195)
    expect(result.getHour()).to.equal(14)
    expect(result.getMinute()).to.equal(54)
    expect(result.getSecond()).to.equal(39)
  })

  it('can parse a Date object into an SWC timestamp', () => {
    //arrange
    const date = new Date(2024, 0, 1)

    //act
    const result = SwcTimestamp.fromDate(date)

    //assert
    expect(result.getYear()).to.equal(25)
    expect(result.getDay()).to.equal(35)
    expect(result.getHour()).to.equal(16)
    expect(result.getMinute()).to.equal(0)
    expect(result.getSecond()).to.equal(0)
  })

  it('can be formatted to custom format strings', () => {
    //arrange
    const timestamp = new SwcTimestamp({ year: 25, day: 6, hour: 6, minute: 15, second: 41 })

    //act
    const result = timestamp.toString('{hms} on day {d} year {y}')
    const result2 = timestamp.toString('{y}.{d}')
    const result3 = timestamp.toString('{y}.{dd}')

    //assert
    expect(result).to.equal('06:15:41 on day 6 year 25')
    expect(result2).to.equal('25.6')
    expect(result3).to.equal('25.06')
  })

  it('strips unknown tags in custom format strings', () => {
    //arrange
    const timestamp = new SwcTimestamp({ year: 8, day: 8, hour: 7, minute: 23, second: 25 })

    //act
    const result = timestamp.toString('{z}.{d}.{y}.{dd}.{ddd}.{hmsz}.{hms}')

    //assert
    expect(result).to.equal('.8.8.08...07:23:25')
  })

  it('treats tags case-insensitively in custom format strings', () => {
    //arrange
    const timestamp = new SwcTimestamp({ year: 25, day: 6, hour: 6, minute: 23, second: 25 })

    //act
    const result = timestamp.toString('Y{Y} D{d}, {hh}:{MM}:{sS}')

    //assert
    expect(result).to.equal('Y25 D6, 06:23:25')
  })
})
