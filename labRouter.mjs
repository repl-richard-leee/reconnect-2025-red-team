import * as fs from 'fs/promises';
import path from 'path';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dbFetchBlogs, dbAddBlog } from './database.mjs';
import { labs } from './labs.mjs';
import { returnLab, returnPage } from './utils.mjs';

const __dirname = path.resolve();

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
    await getLab1(req, res);
  } catch (e) {
    next(e);
  }
});

router.get('/lab2', async (req, res, next) => {
  try {
    await getLab2(req, res);
  } catch (e) {
    next(e);
  }
});

router.get('/lab3', async (req, res, next) => {
  try {
    await getLab3(req, res);
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
    `,
  });
}

async function getLab1(req, res) {
  const { comment } = req.query || {};

  if (!comment) {
    returnLab({
      res,
      labHeader: labs[0],
      body: `
<style>
textarea {
  margin-bottom: 0.5rem;
}
</style>
<a href="/">Back</a>
<p>Leave a comment</p>
<form action="/lab1">
  <textarea name="comment" autofocus required width="200" height="20"></textarea>
  <br />
  <input type="submit" value="Submit" />
</form>
      `,
    });
  }

  returnLab({
    res,
    labHeader: labs[0],
    body: `
<a href="/lab1">Back</a>
<p id="comment"></p>
<script>
  document.getElementById('comment').innerHTML = '${comment}';
</script>
      `,
  });
}

async function getLab2(req, res) {
  returnLab({
    res,
    labHeader: labs[1],
    body: `FIXME: Finish this`,
  });
}

async function getLab3(req, res) {
  const { name } = req.query || {};

  if (!name) {
    returnLab({
      res,
      labHeader: labs[2],
      body: `
<a href="/">Back</a>
<h2 id="greeting"></h2>
<p>Which user would you like to greet?<p>
<form action="/lab3">
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
    .replaceAll('"', '&quot;')
    .replaceAll('`', '`');
  // Done! This must be an exhaustive list, right?

  returnLab({
    res,
    labHeader: labs[2],
    body: `
<a href="/lab3">Back</a>
<h2 id="greeting"></h2>
<script>
  document.getElementById('greeting').innerText = \`Hello ${sanitizedName}\`;
</script>
    `,
  });
}

async function getLab4(req, res, lab) {
  // FIXME: Answers
  // const href = `javascript:var csrf=document.getElementsByName('_csrf')[0].value;alert(csrf)`
  // const href = `javascript:var _csrf=document.getElementsByName('_csrf')[0].value;alert(_csrf);fetch('/lab4',{method:'POST',body:new URLSearchParams({_csrf,authorName:'Victim',authorWebsite:'http://pwned.com',message:'Click my cool website'})})`;

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
