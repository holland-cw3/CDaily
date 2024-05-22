<iframe width="560" height="315" src="https://www.youtube.com/embed/LWLLgXp7gMU?si=9M7BIsHp7cAffB0l" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What it does
CDaily is a web scraping app that scrapes Certificate of Deposit (CD) rates from 10 public banks and credit unions including but not limited to Capital One, Navy Federal Credit Union, etc. We’ve done the research and compiled a plethora of rates into one place, striving to help people with less capital make smarter investments. Users are able to freely traverse rates via a table, filtering by APY, term length, bank name, minimum deposit etc. They can also use our calculator to estimate their total profit. In addition, you can sign up for weekly notifications for the top weekly rates, as well as view them on our very own chrome extension!

## How we built it
CDaily is a multilanguage application using libraries such as React.js and Tailwind CSS for the front-end side of the application. On the back end, we used Node and Puppeteer.js to load chrome pages, and then uses different parsing methods (regex/querySelectors) in order the create new JSON objects: for example: { "TermAmnt": 3, "TermType": "MONTH", "Deposit": 1000, "APY": "2.75%", "Bank": "Navy Federal Credit Union", "Url": "https://www.navyfederal.org/checking-savings/savings/savings-resources/certificate-rates.html" }, We also used the Google Chrome extension developer platform to create and submit for review a working extension for the site.

Finally, we used a PHP backend for subscribing to a weekly notification system.

##What's next for CDaily
What's next for CDaily? More banks! As we continue to work on the app in the future, we will be adding support for more banks, as well as streamlining the data collection process, and improving the overall UI.
