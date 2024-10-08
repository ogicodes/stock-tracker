# Stock Tracker App

## Overview

This is a Stock Portfolio Web Application built using [Next.js](https://nextjs.org/). The app allows users to manage their stock portfolio by adding or removing stocks and displays the current value of each stock based on real-time data fetched from a stock market API. The app calculates the total value of the portfolio based on the latest stock prices.


### Challenge

I wanted to chalenge my self and see if I could build a fullstack web app in one week. But to make things interesting I would build an app about a subject i have no knowledge of and would do it all using TypeScript, Next.js and Prisma. Due to the time constraint I knew I would only be able to get the MVP (Minimum Viable Product) done. For this reason I kept my features simple and used the ShadCN Ui library for the front end. 


### Features

- **New User:** I want to create an account so that I can securely log in and access my online closet.
- **Registered User:** I want to log in and log out so that I can securely access my personal wardrobe and outfit suggestions.
  
- **User Interface:** I want an intuitive and visually appealing interface so that I can easily navigate through the app and enjoy using it.
- **Responsive Design:** I want the app to be responsive and work well on both web and mobile devices


- **Add and remove stocks**: Easily add new stocks to your portfolio and remove existing ones.
- **Live stock prices**: The app fetches up-to-date stock prices from a real-time financial API.
- **Total portfolio value**: Automatically calculates the total value of your portfolio based on current stock prices and the amount owned.
- **Track Transaction**: Keep track of all transactions users do within the app.





## Implementation

### Tech Stack

- MySQL
- Prisma
- Next.Js
- TypeScript
- Tailwind CSS

### Sitemap

- Login/Register
- Dashboard
- Assets
- Transactions

## Finalized Mockups

For the mockups I used Figma to design some simple but clean pages:

![image](https://github.com/user-attachments/assets/91350468-2af5-43a3-a5e9-05a66f135daf)
![image](https://github.com/user-attachments/assets/e3f6dcfc-de05-4262-9ccd-15501ac6d53e)
![image](https://github.com/user-attachments/assets/f256ad75-5b29-4980-9b00-9445c086ba51)
![image](https://github.com/user-attachments/assets/be606955-e9bd-4d35-b136-338547c93a92)


## Roadmap

The goal of my sprints in this roadmap is to break down the project into 4 sections, Design, Front End, Logic and Auth. Due to thew time constraint I have given my self having clear goals and a well structured roadmap is key. Below is the outline:


## SPRINT 1 (Design)

For this sprint I spent the entire first day of the project in figma making wireframes and playing with different designs for the dashboard. This took the majority of day 1 which may have been a lot of time but in hindsignt having the designs there made coding the webapp front go by very quickly. ive included my Finalized mockups above this section and my wireframe and first itterations of the mockups below:

**WireFrame:**
![image](https://github.com/user-attachments/assets/325ff657-11db-4f92-bc7c-df76e15e7899)

**Mockup V1:** 
![image](https://github.com/user-attachments/assets/38d9b7d9-9ef0-4df2-97db-9a6398444663)



## SPRINT 2 (Front End)

After having the mockups finished I spent the next 2 days building the Dashboard, Assets, Transactions and Login/SignUp pages. Along with all of the components like the cards, charts and modals.

## SPRINT 3 (Logic)

For this sprint I broke it down into a few sections: 
- First I created a databse using Prisma. 
- Once I had my DB I worked on finding free stock APIs. 
    -- This is where we hit the first road block. I was able to find free APIs to get individual stocks but I was not able to find free APIs that had uptodate data for candles.
    -- Another roadblock at this point was that all of the APIs I found had limits on how many calls could be made per minute.
    -- Due to these constraints I decided that for the MVP The graphs/charts on the site would use static data.
- lastly I implemented the logic for buying and selling of the stock which is showen on your assets page and is linked with the transactions page so users can view their transactions.

## SPRINT 4 (Auth)

The last sprint was the one that took the longest. Ive never implemented auth on a webapp before and knew that this was not going to be ab easy feat. Initially the way I had done the auth I was using next/cookies and redirect but this was not working because the front end was not placing cookies in local storage so I scrapped the whole thing and started reading the docs on NextAuth.js and tried to do it that way. This was overkill and also much more complicated than it needed to be. With 2days left before my deadline I decided to step away from the project on saturday and come back with fresh eyes on sunday and start doing auth all over again. I'm a big fan of using Ai tools for learning and they are very helpful when it comes to explaining concepts im not familiar with but find it that they can only help me learn something if I know what I dont know. So with the help of ChatGPT and CoPilot I was able to get auth working and host the project on vercel.

## Nice-to-haves

If I were to continue working on this app and build it out to be a real stock tracker it would need alot of features added to it to make it a full fledged app. i've included these below:

### User Profile

- users should be bale to click on their profile where they can update their user settings
- users should be able to change their password
- update their profile picture
- delete their account
- and change the theme of the app based on their prefrences

### App Themes

- app should have light and dark modes
- along with also having colorblind modes for accessibility
- app should have multiple language options

### Stocks & Markets

- app should let you pick between which market you want to track
- app should have forex trading
- and crypto trading options too
- app should load the whole market and not just the top 20 stocks
  
### Graphs/Charts

- app should have real time data for the graphs and charts showing where the stock is currently at
- it should also show the past 30 days
- past year
- and the historical breakdown for the last 5 years as well
