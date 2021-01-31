const path = require('path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type ContentfulAsset implements ContentfulReference & Node @derivedTypes @dontInfer {
      contentful_id: String!
      file: ContentfulAssetFile
      title: String
      description: String
    }
    type ContentfulAssetFile @derivedTypes {
      url: String
    }
    type ContentfulWork implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
      jumbotron: ContentfulAsset @link(by: "id", from: "jumbotron___NODE")
      title: String
      body: ContentfulWorkBody
      fullWidthMedia: [ContentfulAsset] @link(by: "id", from: "fullWidthMedia___NODE")
      mediaGallery: [ContentfulAsset] @link(by: "id", from: "mediaGallery___NODE")
      twoCol: Boolean
      landscape: Boolean
      body2: ContentfulWorkBody2
      right: Boolean
      featuredMedia: ContentfulAsset @link(by: "id", from: "featuredMedia___NODE")
      fullWidthMedia2: [ContentfulAsset] @link(by: "id", from: "fullWidthMedia2___NODE")
      mediaGallery2: [ContentfulAsset] @link(by: "id", from: "mediaGallery2___NODE")
      twoCol2: Boolean
      landscape2: Boolean
      body3: ContentfulWorkBody3
      left: Boolean
      featuredMedia2: ContentfulAsset @link(by: "id", from: "featuredMedia2___NODE")
      rightCredit: ContentfulWorkRightCredit
      slug: String
      createdAt: Date @dateformat
    }
    type ContentfulWorkBody {
      raw: String
      references: [ContentfulAssetContentfulWorkUnion] @link(by: "id", from: "references___NODE")
    }
    union ContentfulAssetContentfulWorkUnion = ContentfulAsset | ContentfulWork
    type ContentfulWorkBody2 {
      raw: String
      references: [ContentfulAssetContentfulWorkUnion] @link(by: "id", from: "references___NODE")
    }
    type ContentfulWorkBody3 {
      raw: String
      references: [ContentfulAssetContentfulWorkUnion] @link(by: "id", from: "references___NODE")
    }
    type ContentfulWorkRightCredit {
      raw: String
    }
    type ContentfulBlog implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
      title: String
      body: ContentfulBlogBody
      blurb: ContentfulBlogBlurb
      featuredMedia: ContentfulAsset @link(by: "id", from: "featuredMedia___NODE")
      published: Date @dateformat
      slug: String
    }
    type ContentfulBlogBody {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    type ContentfulBlogBlurb {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
  `
  createTypes(typeDefs);
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve('./src/templates/blogPost.js');
  const workTemplate = path.resolve('./src/templates/workPost.js');

  const res = await graphql(`
    query {
      allContentfulBlog {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulWork {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  const blogPosts = res.data.allContentfulBlog.edges;

  blogPosts.forEach(({ node }, index) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${node.slug}`,
      context: {
        slug: node.slug,
        prev: index === 0 ? null : blogPosts[index-1].node,
        next: index === (blogPosts.length-1) ? null : blogPosts[index+1].node
      }
    });
  });

  const workPosts = res.data.allContentfulWork.edges;

  workPosts.forEach(({ node }) => {
    createPage({
      component: workTemplate,
      path: `/work/${node.slug}`,
      context: {
        slug: node.slug
      }
    });
  });
}