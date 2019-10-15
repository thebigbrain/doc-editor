async function fetchWithRetries(url) {
  let err
  for (let i = 0; i < 3; i++) {
    try {
      // eslint-disable-next-line
      return await fetch(url).then(x => {
        if (x.ok) {
          return x.json()
        }
        throw new Error('Could not fetch ' + url)
      })
    } catch (e) {
      err = e
    }
  }
  throw err
}

async function fetchPackageJSON(dep, version) {
  try {
    return await fetchWithRetries(`https://unpkg.com/${dep}@${encodeURIComponent(version)}/package.json`)
  } catch (e) {
    return fetchWithRetries(`https://cdn.jsdelivr.net/npm/${dep}@${encodeURIComponent(version)}/package.json`)
  }
}

export async function getAbsoluteDependencies(dependencies) {
  const nonAbsoluteDependencies = Object.keys(dependencies).filter(dep => {
    const version = dependencies[dep]
    const isAbsolute = /^\d+\.\d+\.\d+$/.test(version)
    return !isAbsolute && !/\//.test(version)
  })
  const newDependencies = {...dependencies}
  await Promise.all(nonAbsoluteDependencies.map(async (dep) => {
    try {
      const data = await fetchPackageJSON(dep, dependencies[dep])
      newDependencies[dep] = data.version
    } catch (e) {
      /* ignore */
    }
  }))
  return newDependencies
}
