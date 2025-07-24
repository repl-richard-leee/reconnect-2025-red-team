const dbObj = {
  blogs: [
    {
      author: {
        name: 'Lightning Mockqueen',
        website: 'https://foo.com'
      },
      message: 'One day I should really start a blog',
    },
    {
      author: {
        name: 'Bill Killcode',
        website: 'https://bar.com'
      },
      message: 'I love the smell of napalm in the morning',
    }
  ]
};

export const dbFetchBlogs = async () => {
  return dbObj.blogs;
}

export const dbAddBlog = async (blog) => {
  dbObj.blogs.push(blog);
}