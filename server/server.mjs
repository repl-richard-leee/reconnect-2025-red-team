import * as fs from 'fs/promises';
import express from 'express';
import path from 'path';
import session from 'express-session';
import csurf from 'csurf';
import useLabRouter from './labRouter.mjs';
import errorHandlerMiddleware from './errorHandlerMiddleware.mjs';
import 'dotenv/config';

const __dirname = path.resolve();

const app = express();

// Make mock data to match mock database entries
async function setup() {
  // const tempDir = path.join(__dirname, `temp${process.env.PORT}/`);
  // await fs.mkdir(tempDir, { recursive: true });
  // await fs.writeFile(path.join(tempDir, '5a1bad9a-2516-4f2a-a793-e289bdb48b9f.txt'), Date.now().toString());
  // await fs.writeFile(path.join(tempDir, 'e01decd7-8a65-46ef-a0cd-0483d4304581.txt'), Date.now().toString());
}

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { secure: false }, // Set to true if using HTTPS
  saveUninitialized: true,
  resave: false
}))
app.use(csurf({ cookie: false, key: 'csrf' }));
useLabRouter(app);
app.use(errorHandlerMiddleware);

await setup();

// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});