export const generateDates = () => {
  const currentDate = new Date();
  const numberOfDays = 14;
  const result = [];

  for (let i = 0; i < numberOfDays; i++) {
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
      currentDate.getDay()
    ];
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en', { month: 'short' });

    result.push({ day: dayOfWeek, number: day.toString(), month });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};
