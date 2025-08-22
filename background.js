async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  let result = await getCurrentTab();
  let url = result.url;
  const urlObject = new URL(url);
  let folderName = urlObject.hostname.replace(/.+\/\/|www.|\..+/g, "");
  folderName = folderName.charAt(0).toUpperCase() + folderName.slice(1);
  console.log(folderName);
  let title = result.title;
  let exists = await checkExistanceOfFolder("1", folderName);

  if (!exists) {
    console.log(`${folderName} does not exist`);
    const created = chrome.bookmarks.create(
      { parentId: "1", title: folderName },
      function (newFolder) {
        console.log("added folder: " + newFolder.title);
      }
    );
  }

  chrome.bookmarks.search({ title: folderName }, function (results) {
    if (results.length > 0) {
      let folderId = results[0].id;
      let alreadyThere = "none";
      (async () => {
        alreadyThere = await bookmarkExistsInFolder(folderId, url);

        if (!alreadyThere) {
          chrome.bookmarks.create({
            parentId: folderId,
            title: title,
            url: url,
          });
          console.log(`Added ${title} to ${folderName}`);
        } else {
          console.log("it is already there");
        }
      })();
    }
  });
});

async function bookmarkExistsInFolder(folderId, url) {
  return new Promise((resolve) => {
    chrome.bookmarks.getChildren(folderId, (nodes) => {
      resolve(nodes.some((n) => n.url === url));
    });
  });
}

async function checkExistanceOfFolder(id, fileName) {
  let found = false;
  const nodes = await chrome.bookmarks.search({});
  const results = nodes
    .filter((n) => !n.url)
    .map((n) => ({ id: n.id, title: n.title, parentId: n.parentId ?? null }));
  const files = [];
  for (const i of results) {
    files.push(i.title);
  }
  return files.includes(fileName);
}
