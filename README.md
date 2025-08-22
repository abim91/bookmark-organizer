**Description**

I got tired of having a messy bookmarks bar and manually dragging things into folders. This was a quick way to keep things organized without thinking about it.

This is a small Chrome extension that saves bookmarks into folders automatically. When you add a bookmark, it checks if there’s already a folder for that site (based on the domain). If there isn’t, it creates one. It also avoids saving the same page twice.


**User Stories**

- When I bookmark a page, it should go into a folder named after the site.

- If the folder doesn’t exist yet, it should be created automatically.

- If the exact same page is already saved, don’t add it again.

**Installation Steps**

- Clone or download this repo.

- git clone https://github.com/yourusername/bookmark-organizer.git

- In Chrome, go to chrome://extensions/.

- Turn on Developer mode (top right).

- Click Load unpacked and select the project folder.

The extension should now be active.
