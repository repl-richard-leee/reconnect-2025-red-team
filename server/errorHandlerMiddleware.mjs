export default function errorHandlerMiddleware(err, req, res, next) {
  const { '_csrf': csrf } = req.body || {};

  console.log('ERROR /lab4 Debug Info:');
  console.log('- Session ID:', req.sessionID);
  console.log('- CSRF Secret:', req.session.csrfSecret);
  console.log('- Received CSRF token:', csrf);
  console.log(
    '- Hex CSRF token:',
    Buffer.from(csrf || '', 'utf8').toString('hex')
  );
  console.log('- Token length:', csrf?.length);
  console.log('- Token type:', typeof csrf);
  console.log('- Full req.body:', req.body);

  res.status(400);
  const output = `
    <html>
      <head>
        <title>Error</title>
      </head>
      <body>
        <h1>Error!</h1>
        ${err.message}
      </body>
    </html>
  `;
  res.send(output);
}
