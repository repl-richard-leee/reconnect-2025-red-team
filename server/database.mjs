const dbObjSrc = {
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

let dbObj = {};

export const dbFetchBlogs = async () => {
  return dbObj.blogs;
}

export const dbAddBlog = async (blog) => {
  dbObj.blogs.push(blog);
}

export const dbReset = async () => {
  // Reset the database to the initial state
  dbObj = {};
  dbObj.blogs = dbObjSrc.blogs.map((blog) => ({
    ...blog,
  }));
}

dbReset();