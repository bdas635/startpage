/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"4hUglJd2576I438i","label":"media","bookmarks":[{"id":"qL7qurXQg7MZms4f","label":"twitch","url":"https://www.twitch.tv/"},{"id":"p3y3H5rK4SCKZoCG","label":"youtube","url":"https://www.youtube.com/"},{"id":"iuonfL7bfcV1a3v9","label":"tiktok","url":"https://www.tiktok.com/"},{"id":"xm3df2gh1DVHvsRH","label":"assist","url":"https://assist.org/transfer/results?year=74&institution=128&agreement=114&agreementType=from&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74%2F114%2Fto%2F128%2FMajor%2F1b1664d7-bc32-4099-b0b2-e1fe2b3b762c"}]},{"id":"Pbx7Ei5NiEU715cU","label":"AI","bookmarks":[{"id":"eYzoVEJbKphNCO21","label":"perplexity","url":"https://www.perplexity.ai/"},{"id":"QAmpi9KOqh7PRW0w","label":"chatgpt","url":"https://chatgpt.com/?oai-dm=1"},{"id":"UTaqsQ1CFBUs6jz5","label":"pop","url":"https://www.popai.pro/"},{"id":"VhISt8GwDvRf56u4","label":"aihub","url":"https://aihub.instabase.com/hub/build/018f7eb0-9d90-7688-bba6-9ef230914d01"}]},{"id":"h7loRT6lcL0qe0g6","label":"essentials","bookmarks":[{"id":"hlOhwdCTDHPC662g","label":"soundcloud","url":"https://soundcloud.com/discover"},{"id":"vM86hNwx6n7qBRXd","label":"canvas","url":"https://4cd.instructure.com/"},{"id":"7sDDSjNbbzQWqrLQ","label":"insite","url":"https://m.4cd.edu/campusm/home#menu"},{"id":"nEytlMGevyquGvj5","label":"education plan","url":"https://selfservice.4cd.edu/Student/Planning/DegreePlans?hideProxyDialog=false"}]},{"id":"iQlS8VoYrVwNdqom","label":"daily","bookmarks":[{"id":"Fix2XTDXVzq9VTJC","label":"github","url":"https://github.com/"},{"id":"tcFOu4h5uF256A43","label":"drive","url":"https://drive.google.com/drive/u/0/home"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
