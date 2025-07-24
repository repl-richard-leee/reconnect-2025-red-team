export const labs = [
  {
    title: 'HTML reflection',
  },
  {
    title: '.innerHTML',
  },
  {
    title: 'JavaScript Template Literals',
    description:
      'The <code>&lt;</code>, <code>&gt;</code>, <code>&apos;</code> and <code>&quot;</code> characters are HTML encoded, and the <code>`</code> is escaped',
    hint: 'The reflected string is in a JS template literal',
  },
  {
    title: 'Bypassing CSRF with stored XSS',
    description: `This page has a blog where people can post messages. Your job is to deliver an XSS payload that will induce users to post a message. 
You will need to rely on the user interacting with the page to trigger the XSS payload.
<br />
You can test your payload by reloading the page or asking Richard to be your victim.
<br />
The <code>&lt;</code>, <code>&gt;</code>, <code>\\</code> and <code>&quot;</code> characters are HTML encoded`,
    hints: [
      {
        summary: 'XSS vulnerability location',
        details: 'The website URL input does not check for <code>http://</code> or <code>https://</code> protocol'
      }, 
      {
        summary: 'Extract CSRF',
        details: 'You can get the CSRF token embedded in the page using <code>var csrf=document.getElementsByName(&apos;csrf&apos;)[0].value</code>'
      }
    ]
  }
].map((lab, i) => ({
  ...lab,
  title: `Lab ${i + 1}: ${lab.title}`,
  path: `/lab${i + 1}`,
}));