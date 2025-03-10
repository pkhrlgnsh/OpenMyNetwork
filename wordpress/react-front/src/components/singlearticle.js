import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default function SingleArticle() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ARTICLE, { variables: { id } });

  if (loading) return <div className="loading">Loading article...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <article className="single-article">
      {data.article.featuredImage && (
        <img 
          src={data.article.featuredImage.node.sourceUrl} 
          alt={data.article.title}
          className="article-featured-image"
        />
      )}
      <h1>{data.article.title}</h1>
      <time>{new Date(data.article.date).toLocaleDateString()}</time>
      <div 
        className="article-content" 
        dangerouslySetInnerHTML={{ __html: data.article.content }} 
      />
    </article>
  );
}
