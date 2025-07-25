import express from 'express';
import { dbFetchBlogs, dbAddBlog, dbReset } from './database.mjs';
import { labs } from './labs.mjs';
import { returnLab, returnPage } from './utils.mjs';

const router = express.Router();

// ------------------------------ ENDPOINTS ------------------------------

router.get('/', async (req, res, next) => {
  try {
    await home(req, res);
  } catch (e) {
    next(e);
  }
});

router.get('/lab1', async (req, res, next) => {
  try {
    await getLab1(req, res, labs[0]);
  } catch (e) {
    next(e);
  }
});

router.get('/lab2', async (req, res, next) => {
  try {
    await getLab2(req, res, labs[1]);
  } catch (e) {
    next(e);
  }
});

router.get('/lab3', async (req, res, next) => {
  try {
    await getLab3(req, res, labs[2]);
  } catch (e) {
    next(e);
  }
});

router.get('/lab4', async (req, res, next) => {
  try {
    await getLab4(req, res, labs[3]);
  } catch (e) {
    next(e);
  }
});

router.post('/lab4', async (req, res, next) => {
  try {
    await postLab4(req, res, labs[3]);
  } catch (e) {
    next(e);
  }
});

router.post('/reset', async (req, res, next) => {
  try {
    await postReset(req, res);
  } catch (e) {
    next(e);
  }
});

export default function useLabRouter(app) {
  app.use('/', router);
}

// ------------------------------ ENDPOINT IMPLEMENTATIONS ------------------------------

async function home(req, res) {
  const labListItems = labs
    .map((lab, i) => `<li><a href="lab${i + 1}">${lab.title}</a></li>`)
    .join('\n');

  returnPage({
    res,
    title: 'Home Page',
    body: `
<ul>
  ${labListItems}
</ul>
<br />
<br />
${req.query?.reset ? '<p>Database reset successfully!</p>' : ''}
<form action="/reset" method="POST">
  <input type="hidden" name="_csrf" value="${req.csrfToken()}"
  />
  <input type="submit" value="Reset Database" />
</form>
<p>Note: Resetting the database cannot be undone!</p>
    `,
  });
}

async function getLab1(req, res, lab) {
  const { comment } = req.query || {};

  if (!comment) {
    returnLab({
      res,
      labHeader: lab,
      body: `
<style>
textarea {
  margin-bottom: 0.5rem;
}
</style>
<a href="/">Back</a>
<p>Leave a comment</p>
<form action="${lab.path}">
  <input type="text" name="comment" autofocus required />
  <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
  <br />
  <input type="submit" value="Submit" />
</form>
      `,
    });
  }

  returnLab({
    res,
    labHeader: lab,
    body: `
<a href="${lab.path}">Back</a>
<p>Hello ${comment}</p>
      `,
  });
}

async function getLab2(req, res, lab) {
  // FIXME: Answer
  // const comment = <img src=1 onerror=alert(1) />

  const { comment } = req.query || {};

  if (!comment) {
    returnLab({
      res,
      labHeader: lab,
      body: `
<style>
textarea {
  margin-bottom: 0.5rem;
}
</style>
<a href="/">Back</a>
<p>Leave a comment</p>
<form action="${lab.path}">
  <input type="text" name="comment" autofocus required />
  <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
  <br />
  <input type="submit" value="Submit" />
</form>
      `,
    });
  }

  returnLab({
    res,
    labHeader: lab,
    body: `
<a href="${lab.path}">Back</a>
<p id="comment"></p>
<script>
  document.getElementById('comment').innerHTML = '${comment}';
</script>
      `,
  });
}

async function getLab3(req, res, lab) {
  const { name } = req.query || {};

  if (!name) {
    returnLab({
      res,
      labHeader: lab,
      body: `
<a href="/">Back</a>
<h2 id="greeting"></h2>
<p>Which user would you like to greet?<p>
<form action="${lab.path}">
  <input type="text" name="name" />
  <input type="submit" value="Submit" />
</form>
    `,
    });
  }

  const sanitizedName = name
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&apos;')
    .replaceAll('"', '&quot;');
  // Done! This must be an exhaustive list, right?

  const greeting = `Hello ${sanitizedName}`.replaceAll('`', '\\`'); // Escape backticks for template literals

  returnLab({
    res,
    labHeader: lab,
    body: `
<a href="${lab.path}">Back</a>
<h2 id="greeting"></h2>
<script>
  document.getElementById('greeting').innerText = \`${greeting}\`;
</script>
    `,
  });
}

async function getLab4(req, res, lab) {
  const blogs = await dbFetchBlogs();

  const sanitize = (str) =>
    str
      .replaceAll('"', '%22')
      .replaceAll('\\', '\\\\')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

  const blogsDom = blogs
    .map((blog) => {
      const {
        author: { name, website },
        message,
      } = blog;

      return `
<div class="user-container">
  <a href="${sanitize(website)}" class="user-link">
    <img class="avatar" src="https://media.lordicon.com/icons/wired/gradient/44-avatar-user-in-circle.svg" width="20" height="20" />
    ${sanitize(name)}
  </a>
  <p>${sanitize(message)}</p>
</div>
    `;
    })
    .join('\n');

  returnLab({
    res,
    labHeader: lab,
    body: `
<style>
  .user-container {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .user-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    font-size: 0.8rem;
    color: #000;
  }
  .user-link:hover {
    color: #AAF;
  }
  .avatar {
    margin-right: 0.5rem;
  }
</style>
<a href="/">Back</a>
${blogsDom}
<div>
  <span>Leave a message</span>
  <br />
  <form method="POST" action="${lab.path}">
    <table>
      <tr>
        <td><label for="authorName" class="blog-input-label">Name</label></td>
        <td><input id="authorName" name="authorName" type="text" required /></td>
      </tr>
      <tr>
        <td><label for="authorWebsite" class="blog-input-label">Website</label></td>
        <td><input id="authorWebsite" name="authorWebsite" type="url" required /></td>
      </tr>
    </table>
    <textarea name="message" type="text" cols="160" rows="14"></textarea>
    <input name="_csrf" value="${req.csrfToken()}" type="hidden" />
    <br />
    <input type="submit" value="Submit" />    
  </form>
</div>
    `,
  });
}

async function postLab4(req, res, lab) {
  const { _csrf: csrf, message, authorName, authorWebsite } = req.body || {};

  // Debug logging for CSRF troubleshooting
  console.log('POST /lab4 Debug Info:');
  console.log('- Session ID:', req.sessionID);
  console.log('- CSRF Secret:', req.session.csrfSecret);
  console.log('- Received CSRF token:', JSON.stringify(csrf));
  console.log(
    '- Hex CSRF token:',
    Buffer.from(csrf || '', 'utf8').toString('hex')
  );
  console.log('- Token length:', csrf?.length);
  console.log('- Token type:', typeof csrf);
  console.log('- Full req.body:', req.body);

  if (!csrf || !message) {
    return returnLab({
      res: res.status(400),
      labHeader: lab,
      body: `
<a href="${lab.path}">Back</a>
<p>Missing message or csrf token</p>
`,
    });
  }

  await dbAddBlog({
    author: {
      name: authorName || 'Anonymous',
      website: authorWebsite || null,
    },
    message,
  });

  return getLab4(req, res, lab);
}

async function postReset(req, res) {
  await dbReset();

  return res.redirect(`/?reset=true`);
}