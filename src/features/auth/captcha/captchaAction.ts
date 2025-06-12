export const captchaAction = async (token: string | null) => {
  if (token) {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recaptcha: token,
          baseUrl: window.location.origin,
        }),
      })
      if (response.status === 401) {
        return false
      } else if (response.status === 200) {
        return true
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }
  return false
}
