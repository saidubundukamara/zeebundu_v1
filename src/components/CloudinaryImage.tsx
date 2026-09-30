'use client'

import Image, { type ImageLoader, type ImageProps } from 'next/image'

/**
 * Serves Cloudinary uploads through Cloudinary's own transformations instead of
 * Next's optimizer: best format for the browser (AVIF/WebP), automatic quality,
 * and the width next/image asks for at each breakpoint.
 */
const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  const params = ['f_auto', quality ? `q_${quality}` : 'q_auto', 'c_limit', `w_${width}`].join(',')
  return src.replace('/upload/', `/upload/${params}/`)
}

export function CloudinaryImage(props: Omit<ImageProps, 'loader'>) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through in props
  return <Image {...props} loader={cloudinaryLoader} />
}
