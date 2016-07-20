export function filterByTitle (value, title) {
  return filterBookmarks(value, 'title', title)
}

export function filterByCategory (value, category) {
  if (category == '') return value;
  var filteredBookmarks = {}
  for (var pin in value) {
    if(value[pin]['board']['id'] == category) {
      filteredBookmarks[pin] = value[pin];
    }
  }
  return filteredBookmarks
}

function filterBookmarks (bookmarks, filterBy, filterValue) {
  var filteredBookmarks = {}
  for (var bookmark in bookmarks) {
    if (bookmarks[bookmark][filterBy].indexOf(filterValue) > -1) {
      filteredBookmarks[bookmark] = bookmarks[bookmark]
    }
  }
  return filteredBookmarks
}