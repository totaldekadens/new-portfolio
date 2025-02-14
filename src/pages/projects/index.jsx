import Head from 'next/head'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'
import Image from 'next/image'
import Link from 'next/link'
import Badges from '@/components/Badges'

function Article({ article }) {
  return (
    <article className="flex gap-1">
      <Link
        href={`/projects/${article.slug}`}
        className="md:ml-2 md:w-8/12 lg:w-3/4"
      >
        <Card className=" md:col-span-3">
          <Image
            src={article.image}
            className="z-20 mb-3 block rounded-lg md:hidden"
          />
          <Card.Title href={`/projects/${article.slug}`}>
            {article.title}
          </Card.Title>
          <Card.Eyebrow
            as="time"
            dateTime={article.date}
            className="md:hidden"
            decorate
          >
            {formatDate(article.date)}
          </Card.Eyebrow>
          <Card.Description>{article.description}</Card.Description>
          <Badges keys={article.keys} />
          <Card.Cta>{/* Go to project */}</Card.Cta>
        </Card>
      </Link>

      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden flex-1 md:block"
      >
        {formatDate(article.date)}
        <div className=" mt-4 hidden items-start justify-start md:flex">
          <Image
            className="w-[140px] rounded-lg lg:w-[150px]"
            src={article.image}
          />
        </div>
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Projects - Angelica Moberg Skoglund</title>
        <meta
          name="description"
          content="Some of my projects. Please check out my Github for more."
        />
      </Head>
      <SimpleLayout
        title="Projects"
        intro="This page is under construction. All of my projects are not here atm "
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
