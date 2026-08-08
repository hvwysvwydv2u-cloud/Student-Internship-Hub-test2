import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

function getClient() {
  return createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
  })
}

export const client = {
  fetch: (query, params) => getClient().fetch(query, params),
  get: (query, params) => getClient().get(query, params),
}