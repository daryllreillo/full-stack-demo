# Demo Web App made by @daryllreillo
A full-stack web demo app

## Front End Stack
### Framework: Next.js 13.4
During build, the latest stable version of Next.js was 13.4. Currently, I can see v13.5 has been released just a few days ago.
Next.js' App Router was used for client-routing.
The build started without TypeScript, Tailwind, and ESLint but were eventually introduced due to the following reasons:
- to understand the framework migration process
- to understand the pros and cons of using these new frameworks/tools

### UI: React 18.2 + Tailwind CSS 3.3.3
All components are built with Next.js 13.4 Framework for React.js. CSS modules were initially used for the styles then incrementally migrated to use Tailwind CSS.
Some component styles may not yet be migrated due to lack of time and because there is not much benefit to migrating the styles unless there are future implementations to be made for this project.

### Front End Language: JavaScript / TypeScript + CSS + HTML
At start, vanilla JavaScript was used then the components were incrementally migrated to TypeScript. It is obsereved that vanilla JS have bugs that are type-related and should not exist if TypeScript was used from the very start, saving me a lot of time fixing these type-related bugs.

Tailwind could have also been used from the very start only as a time saver.

## Back End Stack
### Runtime: Node.js
This is the default runtime for current Next.js build.

### Authentication: Next-Auth
I had a choice to use Auth0 or Next-Auth for authentication but choose the latter because it was the first framework that I discovered for authentication which claimed to be compatible with Next.js projects.

I also used nodemailer for the email verification process.

### Database: PostgreSQL
Initially, MongoDB was used for the database but was migrated to PostgreSQL. I find it easier to use SQL than document-based database which is why I won't be using MongoDB in the future if possible.

All content data (users and todos data) are persisted using PostgreSQL database.

### API Handling: Next.js Route Handlers
Route Handlers are the default back-end API handling for Next.js App Router.

### Back End Language: TypeScript + SQL
As mentioned, vanilla JavaScript was used initially for this project then I migrated all JS code to TypeScript to learn the migration process.
MongoDB (no-SQL) was also used initially but I also migrated all the database code to PostgreSQL with the same reason as above.
