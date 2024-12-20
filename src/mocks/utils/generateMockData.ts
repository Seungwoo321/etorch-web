type ParameterType = 'A' | 'Y' | 'M' | 'D' | 'Q'

interface Data {
  date: string
  value: number
}

function incrementDate (dateString: string, format: ParameterType): string {
  const [year, month, day] = dateString.split('-').map(Number)
  let newYear = year; let newMonth = month; let newDay = day

  if (format === 'Y' || format === 'A') {
    newYear++
    return `${newYear}`
  } else if (format === 'M') {
    newMonth++
    if (newMonth > 12) {
      newYear++
      newMonth = 1
    }
    return `${newYear}-${String(newMonth).padStart(2, '0')}`
  } else if (format === 'Q') {
    if (dateString === '2019-12-31') return '2020-1Q'
    let newYear = +dateString.substring(0, 4)
    let newMonth = +dateString.substring(5, 6)
    newMonth++
    if (newMonth > 4) {
      newYear++
      newMonth = 1
    }
    return `${newYear}-${newMonth}Q`
  } else {
    newDay++
    const lastDayOfMonth = new Date(newYear, newMonth, 0).getDate()
    if (newDay > lastDayOfMonth) {
      newMonth++
      newDay = 1
      if (newMonth > 12) {
        newYear++
        newMonth = 1
      }
    }
    return `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`
  }
}

function getRandomValue (parameter: ParameterType): number {
  if (parameter === 'Y') {
    return Math.floor(Math.random() * 1001) + 1000
  } else if (parameter === 'M') {
    return Math.floor(Math.random() * 21) + 80
  } else {
    return Math.floor(Math.random() * 1001)
  }
}

export function generateMockData (parameter: ParameterType): Data[] {
  const data: Data[] = []
  let currentDate = '2019-12-31'

  for (let i = 0; i < 10; i++) {
    const value = getRandomValue(parameter)
    currentDate = incrementDate(currentDate, parameter)
    if (currentDate === '') continue
    data.push({ date: currentDate, value })
  }
  return data
}
