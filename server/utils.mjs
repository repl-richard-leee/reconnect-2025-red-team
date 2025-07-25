export function returnLab({ res, labHeader, body }) {
  returnPage({
    res,
    title: labHeader.title,
    description: labHeader.description,
    hint: labHeader.hint,
    hints: labHeader.hints,
    body,
  });
}

export function returnPage({ res, title, description, hint, hints = [], body }) {
  const descriptionDom = description ? `<p>${description}</p>` : '';
  let hintDom = hint
    ? `<details>
        <summary>Hint (click to expand)</summary>
        ${hint}
      </details>`
    : '';

  hintDom = hints.map((hint, i) => `
<details>
  <summary>Hint${hints.length > 1 ? ` ${i + 1}`: ''} (click to expand): ${hint.summary}</summary>
  <div class="hint-details" >${hint.details}</div>
</details>
    `)?.join('\n') || '';

  res.send(`
<html>
  <head>
    <title>Reconnect 2025 Red Team ${title}</title>
    <style>
      body {
        margin-left: 100px;
        margin-right: 100px;
        font-family: arial;
      }
      summary {
        cursor: pointer;
      }
      code {
        background-color: #EEE;
        padding: 2px;
      }
      .hint-details {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-left: 0.5rem;
        padding: 0.5rem;
        background-color: rgb(255, 255, 200);
      }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    ${descriptionDom}
    ${hintDom}
    <hr />
    ${body}
  </body>
</html>`);
}
