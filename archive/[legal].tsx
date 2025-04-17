import { getAllLegalDocIds, getLegalDocData } from "../lib/legalDocs";
import { GetStaticPaths, GetStaticProps } from 'next';
import { remark } from 'remark';
import html from 'remark-html';
import Header, { IHeaderProps } from "../components/Header";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllLegalDocIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const legalDocData = getLegalDocData(params?.legal as string);
  const processedContent = await remark().use(html).process(legalDocData.content);
  const contentHtml = processedContent.toString();

  const title = "Privacy Policy";
  const description = "Obsidian Stats Privacy Policy";
  const canonical = `https://www.obsidianstats.com/privacy-policy`;
  const image = `/images/obsidian-stats-ogImage.png`;
  const jsonLdSchema = null;

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      legalDocData: {
        ...legalDocData,
        contentHtml,
      },
    },
  };
};

interface ILegalDocData {
  id: string;
  title: string;
  content: string;
  contentHtml: string;
}

interface ILegalDocProps extends IHeaderProps {
  legalDocData: ILegalDocData;
}

const Legal = (props: ILegalDocProps) => {
  const { legalDocData } = props;
  return (
    <div>
      <Header {...props} />
      <Navbar current="posts" />
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <article className="prose !max-w-none prose-img:mx-auto prose-img:max-h-[512px] prose-headings:text-gray-700 prose-strong:text-gray-700">
            <h1 className="mt-2 mb-0 text-3xl text-center text-gray-800">{legalDocData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: legalDocData.contentHtml }} />
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Legal;