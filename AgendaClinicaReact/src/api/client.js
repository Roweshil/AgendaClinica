

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.error || "Error")

  return data
}