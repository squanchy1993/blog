import 'css/prism.css'
import 'katex/dist/katex.css'

import PostLayout from './component/PostLayout'
import { ArticleModel } from 'types/index.types'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { alovaInstance } from 'http/index'
import { ArticleDetail } from 'types/index.types'
import { data } from 'autoprefixer'

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] }
// }): Promise<Metadata | undefined> {
//   const slug = decodeURI(params.slug.join('/'))
//   const post = allBlogs.find((p) => p.slug === slug)
//   const authorList = post?.authors || ['default']
//   const authorDetails = authorList.map((author) => {
//     const authorResults = allAuthors.find((p) => p.slug === author)
//     return coreContent(authorResults as Authors)
//   })
//   if (!post) {
//     return
//   }

//   const publishedAt = new Date(post.date).toISOString()
//   const modifiedAt = new Date(post.lastmod || post.date).toISOString()
//   const authors = authorDetails.map((author) => author.name)
//   let imageList = [siteMetadata.socialBanner]
//   if (post.images) {
//     imageList = typeof post.images === 'string' ? [post.images] : post.images
//   }
//   const ogImages = imageList.map((img) => {
//     return {
//       url: img.includes('http') ? img : siteMetadata.siteUrl + img,
//     }
//   })

//   return {
//     title: post.title,
//     description: post.summary,
//     openGraph: {
//       title: post.title,
//       description: post.summary,
//       siteName: siteMetadata.title,
//       locale: 'en_US',
//       type: 'article',
//       publishedTime: publishedAt,
//       modifiedTime: modifiedAt,
//       url: './',
//       images: ogImages,
//       authors: authors.length > 0 ? authors : [siteMetadata.author],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description: post.summary,
//       images: imageList,
//     },
//   }
// }

// export const generateStaticParams = async () => {
//   const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

//   return paths
// }

export default async function Page({ params }: { params: { id: number } }) {
  const { data: articleInfo } = await alovaInstance.Get<{ data: ArticleDetail }>(
    `https://nestjs.zsjs.fun/article/detail/${params.id}`,
    {
      localCache: 1000,
      next: { revalidate: 0 },
    }
  )

  return (
    <>
      <PostLayout content={articleInfo}>
        <Markdown rehypePlugins={[rehypeRaw]}>{articleInfo.content}</Markdown>
      </PostLayout>
    </>
  )
}
