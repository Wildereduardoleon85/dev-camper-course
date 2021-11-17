const slugify = (string: string) => {
  const stringConverted = string
    .split(' ')
    .map((item) => `${item}-`)
    .join()
    .replace(',', '')
    .toLowerCase()
  return stringConverted.substring(0, stringConverted.length - 1)
}

export default slugify
