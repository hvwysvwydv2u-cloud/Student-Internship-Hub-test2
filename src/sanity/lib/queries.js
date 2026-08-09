import { defineQuery } from 'next-sanity'

export const FACTORIES_QUERY = defineQuery(`*[_type == "factory"] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  location,
  description,
  hours,
  departments,
  contact,
  phone,
  email,
  website,
  price,
  rating,
  "logo": logo.asset->url
}`)

export const FACTORY_BY_SLUG_QUERY = defineQuery(`*[_type == "factory" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  location,
  description,
  hours,
  departments,
  contact,
  phone,
  email,
  website,
  price,
  rating,
  "logo": logo.asset->url,
  "coverImage": coverImage.asset->url
}`)

export const INTERNSHIPS_BY_FACTORY_QUERY = defineQuery(`*[_type == "internship" && factory._ref == $factoryId]{
  _id,
  title,
  "slug": slug.current,
  location,
  description,
  hours,
  price,
  departments,
  "image": image.asset->url
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
  "factorySlug": factory->slug.current,
  "factoryLogo": factory.logo.asset->url
}`)
