export const generateRandomString = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" 
  var result = ""

  for (let i = 0 ; i < length ; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result
}

export const generateRandomNumber = (length: number): string => {
  const nums = "0123456789"
  var result = ""

  for (let i = 0; i < length; i++) {
    result += nums.charAt(Math.floor(Math.random() * nums.length));
  }

  return result
}