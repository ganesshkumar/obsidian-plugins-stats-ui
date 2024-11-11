import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/HeaderPost';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface PostData {
  id: string;
  title: string;
  description: string;
  date: string;
  contentHtml: string;
  content: string;
}

interface PostProps {
  postData: PostData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = getPostData(params?.slug as string);
  const processedContent = await remark().use(html).process(postData.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        ...postData,
        contentHtml,
      },
    },
  };
};

const Post: React.FC<PostProps> = ({ postData }) => {
  return (
    <div>
     <Header title={postData.title} description={postData.description} date={postData.date} slug={postData.id} />
     <Navbar current='new'/>
     {/* New Plugins */}
     <div className='bg-white pt-5'>
       <div className='max-w-6xl mx-auto px-2'>
        <article className='prose !max-w-none'>
          <h1>{postData.title}</h1>
          <p>{postData.date}</p>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
       </div>
     </div>
     <Footer />
   </div>
  );
};

export default Post;
