import { InitiationMoment} from '@/interfaces'
import { TimestampUnitOptions } from '@/types'

/**
 * Utility class for working with Star Wars Combine timestamps. Represents Combine  Galactic Time and can convert unix timestamps and Date objects to/from CGT.
 * @method toUnixTimestamp
 * @method toDate
 * @method getYear
 * @method getDay
 * @method getHour
 * @method getMinute
 * @method getSecond
 */
export class SwcTimestamp {
  protected year: number
  protected day: number
  protected hour: number
  protected minute: number
  protected second: number

  private static swcStart = new Date(1998, 11, 3, 7, 0, 0)

  /**
   * Create a new SwcTimestamp object for a specific moment in Combine Galactic Time.
   * @param {InitiationMoment} source
   */
  constructor(source: InitiationMoment) {
    const {
      year,
      day,
      hour = 0,
      minute = 0,
      second = 0
    } = source

    this.year = year
    this.day = day
    this.hour = hour
    this.minute = minute
    this.second = second
  }

  /**
   * Convert a unix timestamp to Combine Galactic Time.
   * @param {number} unixTimestamp timestamp to convert. Can be either seconds or milliseconds, the code will detect which units to use.
   * @returns {SwcTimestamp}
   */
  static fromUnixTimestamp(unixTimestamp: number): SwcTimestamp {
    if (unixTimestamp < 100000000000) {
      unixTimestamp = unixTimestamp * 1000
    }
    return this.calculateSwcTimestampFromMillisecondsSinceStart(unixTimestamp - this.swcStart.getTime())
  }

  /**
   * Convert a Date object into Combine Galactic Time.
   * @param {Date} date
   * @returns {SwcTimestamp}
   */
  static fromDate(date: Date): SwcTimestamp {
    return this.calculateSwcTimestampFromMillisecondsSinceStart(date.getTime() - this.swcStart.getTime())
  }

  /**
   * Get the current Combine Galactic Time.
   * @returns {SwcTimestamp}
   */
  static now(): SwcTimestamp {
    return SwcTimestamp.fromDate(new Date())
  }

  /**
   * Convert the SWC timestamp into a unix timestamp
   * @param {TimestampUnitOptions} unit Whether the unix timestamp should be in seconds or milliseconds.
   * @returns {number}
   */
  toUnixTimestamp(unit: TimestampUnitOptions): number {
    const raw = this.calculateMillisecondsSinceStartFromSwcTimestamp() + SwcTimestamp.swcStart.getTime()
    if (unit === 'sec' || unit === 'seconds') {
      return raw / 1000
    } else {
      return raw
    }
  }

  /**
   * Convert the SWC timestamp into a Date object.
   * @returns {Date}
   */
  toDate(): Date {
    return new Date(this.calculateMillisecondsSinceStartFromSwcTimestamp() + SwcTimestamp.swcStart.getTime())
  }

  /**
   * @returns {number}
   */
  getYear(): number {
    return this.year
  }

  /**
   * @returns {number}
   */
  getDay(): number {
    return this.day
  }

  /**
   * @returns {number}
   */
  getHour(): number {
    return this.hour
  }

  /**
   * @returns {number}
   */
  getMinute(): number {
    return this.minute
  }

  /**
   * @returns {number}
   */
  getSecond(): number {
    return this.second
  }

  /**
   *
   * @param {number} msSinceSwcStart
   * @returns {SwcTimestamp}
   * @private
   */
  private static calculateSwcTimestampFromMillisecondsSinceStart(msSinceSwcStart: number): SwcTimestamp {
    const msPerYear = 365 * 24 * 60 * 60 * 1000
    const msPerDay = 24 * 60 * 60 * 1000
    const msPerHour = 60 * 60 * 1000
    const msPerMinute = 60 * 1000

    const year = Math.floor(msSinceSwcStart / msPerYear)
    msSinceSwcStart -= year * msPerYear

    const day = Math.floor(msSinceSwcStart / msPerDay)
    msSinceSwcStart -= day * msPerDay

    const hour = Math.floor(msSinceSwcStart / msPerHour)
    msSinceSwcStart -= hour * msPerHour

    const minute = Math.floor(msSinceSwcStart / msPerMinute)
    msSinceSwcStart -= minute * msPerMinute

    const seconds = Math.floor(msSinceSwcStart / 1000)

    return new SwcTimestamp({
      year,
      day,
      hour,
      minute,
      second: seconds
    })
  }

  /**
   * @returns {number}
   * @private
   */
  private calculateMillisecondsSinceStartFromSwcTimestamp(): number {
    const msPerYear = 365 * 24 * 60 * 60 * 1000
    const msPerDay = 24 * 60 * 60 * 1000
    const msPerHour = 60 * 60 * 1000
    const msPerMinute = 60 * 1000

    let msSinceSwcStart = 0

    msSinceSwcStart += this.year * msPerYear
    msSinceSwcStart += (this.day - 1) * msPerDay
    msSinceSwcStart += (this.hour + 1) * msPerHour
    msSinceSwcStart += this.minute * msPerMinute
    msSinceSwcStart += this.second * 1000

    return msSinceSwcStart
  }
}
