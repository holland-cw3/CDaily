

## What it does
CDaily is a web scraping app that scrapes Certificate of Deposit (CD) rates from 10 public banks and credit unions including but not limited to Capital One, Navy Federal Credit Union, etc. We’ve done the research and compiled a plethora of rates into one place, striving to help people with less capital make smarter investments. Users are able to freely traverse rates via a table, filtering by APY, term length, bank name, minimum deposit etc. They can also use our calculator to estimate their total profit. In addition, you can sign up for weekly notifications for the top weekly rates, as well as view them on our very own chrome extension!


![Screenshot 2024-05-22 113749](https://github.com/holland-cw3/CDaily/assets/101285025/19952106-58f5-49ab-a474-250ade32f80e)

## How we built it
CDaily is a multilanguage application using libraries such as React.js and Tailwind CSS for the front-end side of the application. On the back end, we used Node and Puppeteer.js to load chrome pages, and then uses different parsing methods (regex/querySelectors) in order the create new JSON objects: for example: { "TermAmnt": 3, "TermType": "MONTH", "Deposit": 1000, "APY": "2.75%", "Bank": "Navy Federal Credit Union", "Url": "https://www.navyfederal.org/checking-savings/savings/savings-resources/certificate-rates.html" }, We also used the Google Chrome extension developer platform to create and submit for review a working extension for the site.


![image](https://github.com/holland-cw3/CDaily/assets/101285025/27d99b3e-44a4-4e35-ae31-724127d7b33b)

We also built a chrome extension (not currently available)!
![Extension Screenshot](https://github.com/user-attachments/assets/b6347be4-8374-4fc6-8eee-80244bc65b29)



Finally, we used a PHP backend for subscribing to a weekly notification system.

## What's next for CDaily
What's next for CDaily? More banks! As we continue to work on the app in the future, we will be adding support for more banks, as well as streamlining the data collection process, and improving the overall UI.

https://youtu.be/LWLLgXp7gMU?si=s4QHQ4P2Rosc9efE
