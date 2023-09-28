import { endOfYear, addYears, startOfToday } from 'date-fns';

export function checkSearchFromValidity(searchFrom) {
  const today = startOfToday();

  if (searchFrom) {
    const fromDate = new Date(searchFrom);
    if (Number.isNaN(fromDate.getDate())) {
      return false;
    }
    if (fromDate < today) {
      return false;
    }
    return true;
  }
  return false;
}

export function checkSearchToValidity(searchTo) {
  const today = startOfToday();

  if (searchTo) {
    const toDate = new Date(searchTo);
    if (Number.isNaN(toDate.getDate())) {
      return false;
    }
    if (toDate > endOfYear(addYears(today, 1))) {
      return false;
    }
    return true;
  }
  return false;
}

export function checkSearchCountValidity(searchCount, minValue, maxValue) {
  return searchCount >= minValue && searchCount <= maxValue;
}
