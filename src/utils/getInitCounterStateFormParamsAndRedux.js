export default function getInitCounterStateFormParamsAndRedux(
  counterString,
  counterFromRedux,
  min,
  max,
  searchParams,
) {
  const counterFromSearch = searchParams.get(counterString);
  if (!counterFromSearch) {
    if (searchParams.size) {
      return min;
    }
    return counterFromRedux;
  }
  const isCounterFromSearchValid =
    +counterFromSearch >= min && +counterFromSearch <= max;

  if (isCounterFromSearchValid) {
    return +counterFromSearch;
  }
  return min;
}
