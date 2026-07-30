import { defineQuery } from 'next-sanity'

export const FACTORIES_QUERY = defineQuery(`*[_type == "factory"]{
  _id,
  name,
  "slug": slug.current,
  location,
  description,
  hours,
  departments,
  contact,
  price,
  "logo": logo.asset->url
}`)

export const HOUSING_QUERY = defineQuery(`*[_type == "housing"]{
  _id,
  name,
  location,
  price,
  contact,
  isComingSoon,
  "image": image.asset->url
}`)

export const INTERNSHIPS_QUERY = defineQuery(`*[_type == "internship"]{
  _id,
  title,
  "name": title,
  "slug": slug.current,
  location,
  description,
  hours,
  price,
  departments,
  "image": image.asset->url,
  "factoryName": factory->name,
  "factoryLogo": factory.logo.asset->url
}`)
