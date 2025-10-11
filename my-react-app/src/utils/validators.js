// Basic strength checker: length, upper, lower, digit, special
export function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: 'Too weak', ok: false }

  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  // Map score to label
  let label = 'Too weak'
  if (score >= 4 && pwd.length >= 10) label = 'Strong'
  else if (score >= 3) label = 'Medium'
  else label = 'Weak'

  // Minimum policy for allowing submit
  const ok = score >= 3 && pwd.length >= 8
  return { score, label, ok }
}
