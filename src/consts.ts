// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
const baseUrl = import.meta.env.BASE_URL;
// Site config
export const SITE_URL = "https://zacznijprogramowac.net/"; // your https url
export const SITE_TITLE = "ZacznijProgramowac.net"; // your base page title
export const SITE_DESCRIPTION = "Blog o programowaniu, nauce, darmowe kursy programowania. Główne tematy to Angular, TypeScript, JavaScript i więcej."; // your base description
export const HEADER_TITLE = "Zacznij Programować"; // your title used in header
export const LOGO_FILE_NAME = "logo.png"; // put your logo in 'public' folder
export const OPEN_GRAPH_IMAGE = "og-image.png"; // put the image in 'public' folder
export const LOCALE = "pl-PL";

// Analytics
export const GOOGLE_ANALYTICS_ID = "GTM-M3XTWCP";

// Home page
export const POST_ON_HOME_PAGE = 5; // amount off post on main page
export const POSTS_PER_PAGE = 10; // Pagination on 'Posts' page

// Social config
export const SHOW_SOCIAL_LINKS = true;
export const GITHUB = "https://github.com/DawidRyczko";
export const LINKEDIN = "https://www.linkedin.com/in/dawid-ryczko/";
export const X = "";
export const FACEBOOK = "";
export const INSTAGRAM = "";
export const EMAIL = "zacznijprogramowac@gmail.com";
export const RSS = `${baseUrl}/rss.xml`;
