import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_ARTICLES = gql`
  query GetArticles($first: Int, $after: String) {
    articles(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export default function ArticleList() {
  const { loading, error, data, fetchMore } = useQuery(GET_ARTICLES, {
    variables: { first: 10 }
  });

  if (loading) return <div className="loading">Loading articles...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="article-list">
      {data.articles.edges.map(({ node }) => (
        <article key={node.id} className="article-card">
          <Link to={`/article/${node.id}`}>
            {node.featuredImage && (
              <img 
                src={node.featuredImage.node.sourceUrl} 
                alt={node.title}
                className="article-thumbnail"
              />
            )}
            <h2>{node.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <time>{new Date(node.date).toLocaleDateString()}</time>
          </Link>
          
          {data.articles.pageInfo.hasNextPage && (
            <button 
              className="load-more"
              onClick={() => fetchMore({
                variables: { after: data.articles.pageInfo.endCursor }
              })}
            >
              Load More Articles
            </button>
          )}
        </article>
      ))}
    </div>
  );
}
