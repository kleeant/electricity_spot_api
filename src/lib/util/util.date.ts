import datefns from 'date-fns'

export const firstDateIsNewer = (date: Date, compare: Date): boolean => {
  return date > compare
}

export const removeDays = (days: number, date: Date = new Date()): Date => {
  return datefns.subDays(date, days)
}

export const addDays = (days: number, date: Date = new Date()): Date => {
  return datefns.addDays(date, days)
}

export const addHours = (hours: number, date: Date = new Date()): Date => {
  return datefns.addHours(date, hours)
}
