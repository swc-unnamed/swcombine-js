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
  private static swcStart = new Date(Date.UTC(1998, 11, 3, 7, 0, 0))
  protected year: number
  protected day: number
  protected hour: number
  protected minute: number
  protected second: number

  /**
   * Create a new SwcTimestamp object for a specific moment in Combine Galactic Time.
   * @param {TimestampMoment} source
   */
  constructor(source: TimestampMoment) {
    const { year, day, hour = 0, minute = 0, second = 0 } = source

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
      day: day + 1,
      hour,
      minute,
      second: seconds,
    })
  }

  /**
   * Convert the SWC timestamp into a unix timestamp
   * @param {'sec' | 'ms' | 'seconds' | 'milliseconds'} unit Whether the unix timestamp should be in seconds or milliseconds.
   * @returns {number}
   */
  toUnixTimestamp(unit: 'sec' | 'ms' | 'seconds' | 'milliseconds'): number {
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

  asMoment(): TimestampMoment {
    return { year: this.year, day: this.day, hour: this.hour, minute: this.minute }
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
   * Calculate a new timestamp by adding time to this timestamp, and return the newly calculated timestamp.
   * @param duration
   */
  add(duration: Partial<Duration>): SwcTimestamp {
    const unixTime = this.toUnixTimestamp('sec')
    return SwcTimestamp.fromUnixTimestamp(unixTime + durationToSeconds(duration))
  }

  /**
   * Calculate a new timestamp by subtracting time from this timestamp, and return the newly calculated timestamp.
   * @param duration
   */
  subtract(duration: Partial<Duration>): SwcTimestamp {
    const unixTime = this.toUnixTimestamp('sec')
    return SwcTimestamp.fromUnixTimestamp(
      Math.max(unixTime - durationToSeconds(duration), SwcTimestamp.swcStart.getTime() / 1000),
    )
  }

  getDurationTo(otherTimestamp: SwcTimestamp): Duration {
    const startTime = this.toUnixTimestamp('sec')
    const endTime = otherTimestamp.toUnixTimestamp('sec')

    return secondsToDuration(endTime - startTime)
  }

  /**
   * Convert the SWC timestamp to a string (i.e. Year 25 Day 60, 12:45:21).
   * You can either pass in a preset name, or a custom format string.
   * The following preset formats are available:
   *
   * 'full': Year 25 Day 60, 6:03:12<br>
   * 'minute': Year 25 Day 60, 6:03<br>
   * 'day': Year 25 Day 60<br>
   * 'shortFull': Y25 D60, 6:03:12<br>
   * 'shortMinute': Y25 D60, 6:03<br>
   * 'shortDay': Y26 D60<br>
   * <br>
   * If passing in a custom formatting string, you can use substitution tags to fill in variables. These tags are wrapped in {} and are case-insensitive. The following substitution tags are available:<br>
   * {y}: year<br>
   * {d}: day<br>
   * {h}: hour<br>
   * {m}: minute<br>
   * {s}: second<br>
   * double the tag to get leading zeroes. i.e. {h} = 8, {hh} = 08.<br>
   * {hms} is a shorthand for {hh}:{mm}:{ss}.<br>
   * Example: '{hms} on Day {d} of Year {y}' becomes '08:12:14 on Day 6 of Year 25'.
   * @param format format to use, or custom formatting string.
   */
  toString(format: 'full' | 'minute' | 'day' | 'shortFull' | 'shortMinute' | 'shortDay' | string = 'full') {
    switch (format) {
      case 'full':
        return `Year ${this.year} Day ${this.day}, ${this.hour}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`
      case 'minute':
        return `Year ${this.year} Day ${this.day}, ${this.hour}:${this.minute.toString().padStart(2, '0')}`
      case 'day':
        return `Year ${this.year} Day ${this.day}`
      case 'shortFull':
        return `Y${this.year} D${this.day}, ${this.hour}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`
      case 'shortMinute':
        return `Y${this.year} D${this.day}, ${this.hour}:${this.minute.toString().padStart(2, '0')}}`
      case 'shortDay':
        return `Y${this.year} D${this.day}`
    }

    let formattedString = ''
    let currentTag = ''
    let isInTag = false
    format.split('').forEach((char) => {
      if (char === '{' && !isInTag) {
        isInTag = true
        return
      }
      if (char === '}' && isInTag) {
        formattedString += this.substituteTag(currentTag)
        isInTag = false
        currentTag = ''
        return
      }

      if (isInTag) {
        currentTag += char
      } else {
        formattedString += char
      }
    })

    return formattedString
  }

  private substituteTag(tag: string): string {
    if (tag.localeCompare('y', 'en', { sensitivity: 'accent' }) === 0) {
      return this.year.toString()
    }
    if (tag.localeCompare('yy', 'en', { sensitivity: 'accent' }) === 0) {
      return this.year.toString().padStart(2, '0')
    }
    if (tag.localeCompare('d', 'en', { sensitivity: 'accent' }) === 0) {
      return this.day.toString()
    }
    if (tag.localeCompare('dd', 'en', { sensitivity: 'accent' }) === 0) {
      return this.day.toString().padStart(2, '0')
    }
    if (tag.localeCompare('h', 'en', { sensitivity: 'accent' }) === 0) {
      return this.hour.toString()
    }
    if (tag.localeCompare('hh', 'en', { sensitivity: 'accent' }) === 0) {
      return this.hour.toString().padStart(2, '0')
    }
    if (tag.localeCompare('m', 'en', { sensitivity: 'accent' }) === 0) {
      return this.minute.toString()
    }
    if (tag.localeCompare('mm', 'en', { sensitivity: 'accent' }) === 0) {
      return this.minute.toString().padStart(2, '0')
    }
    if (tag.localeCompare('s', 'en', { sensitivity: 'accent' }) === 0) {
      return this.second.toString()
    }
    if (tag.localeCompare('ss', 'en', { sensitivity: 'accent' }) === 0) {
      return this.second.toString().padStart(2, '0')
    }
    if (tag.localeCompare('hms', 'en', { sensitivity: 'accent' }) === 0) {
      return `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`
    }
    return ''
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
    msSinceSwcStart += this.hour * msPerHour
    msSinceSwcStart += this.minute * msPerMinute
    msSinceSwcStart += this.second * 1000

    return msSinceSwcStart
  }
}

export interface TimestampMoment {
  year: number
  day: number
  hour?: number
  minute?: number
  second?: number
}

export interface Duration {
  years: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

const durationToSeconds = (duration: Partial<Duration>) =>
  (duration.years || 0) * 365 * 24 * 60 * 60 +
  (duration.days || 0) * 24 * 60 * 60 +
  (duration.hours || 0) * 60 * 60 +
  (duration.minutes || 0) * 60 +
  (duration.seconds || 0)

const secondsToDuration = (seconds: number) => {
  const secPerYear = 365 * 24 * 60 * 60
  const secPerDay = 24 * 60 * 60
  const secPerHour = 60 * 60
  const secPerMinute = 60
  let secondsToConvert = seconds

  const years = Math.floor(seconds / secPerYear)
  secondsToConvert -= years * secPerYear

  const days = Math.floor(seconds / secPerDay)
  secondsToConvert -= days * secPerDay

  const hours = Math.floor(seconds / secPerHour)
  secondsToConvert -= hours * secPerHour

  const minutes = Math.floor(seconds / secPerMinute)
  secondsToConvert -= minutes * secPerMinute

  return { years, days, hours, minutes, seconds: secondsToConvert }
}
