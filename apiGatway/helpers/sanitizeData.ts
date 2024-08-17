const elementsToExclude = {
  password: "password",
}
export const sanitizeData = (obj: Record<string, any>) => {
  if (!obj) return {}
  const sanitizedObj: Record<string, any> = {}
  Object.keys(obj).forEach((key) => {
    if (!elementsToExclude[key as keyof typeof elementsToExclude]) {
      sanitizedObj[key] = obj[key]
    }
  })
  return sanitizedObj
}
