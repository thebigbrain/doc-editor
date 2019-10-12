export function clearCorrectionsFromAction(
  currentCorrections,
  action,
) {
  if (action.path === '*') {
    return currentCorrections.filter(cor => cor.source !== action.source)
  }

  return currentCorrections.filter(
    cor => cor.source !== action.source && cor.path !== action.path,
  )
}
