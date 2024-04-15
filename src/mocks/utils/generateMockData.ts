type ParameterType = 'Y' | 'M' | 'D';

interface Data {
  date: string;
  value: number;
}

function incrementDate(dateString: string, format: ParameterType): string {
  const [year, month, day] = dateString.split('-').map(Number);
  let newYear = year, newMonth = month, newDay = day;

  if (format === 'Y') {
    newYear++;
    return `${newYear}`;
  } else if (format === 'M') {
    newMonth++;
    if (newMonth > 12) {
      newYear++;
      newMonth = 1;
    }
    return `${newYear}-${String(newMonth).padStart(2, '0')}`;
  } else {
    newDay++;
    const lastDayOfMonth = new Date(newYear, newMonth, 0).getDate();
    if (newDay > lastDayOfMonth) {
      newMonth++;
      newDay = 1;
      if (newMonth > 12) {
        newYear++;
        newMonth = 1;
      }
    }
    return `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`;
  }
}

function getRandomValue(parameter: ParameterType): number {
  if (parameter === 'Y') {
    return Math.floor(Math.random() * 1001) + 1000;
  } else if (parameter === 'M') {
    return Math.floor(Math.random() * 21) + 80;
  } else {
    return Math.floor(Math.random() * 1001);
  }
}

export function generateMockData(parameter: ParameterType): Data[] {
  const data: Data[] = [];
  let currentDate = '2019-12-31';

  for (let i = 0; i < 10; i++) {
    const value = getRandomValue(parameter);
    currentDate = incrementDate(currentDate, parameter);
    data.push({ date: currentDate, value });
  }
  return data;
}
