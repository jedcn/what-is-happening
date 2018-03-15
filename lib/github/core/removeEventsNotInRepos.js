const removeEventsNotInRepos = (userEventsData, focusOnRepos) => {
  if (focusOnRepos.length === 0) {
    return userEventsData;
  }
  return userEventsData.filter((userEventMap) => {
    const repoNameForEvent = userEventMap.getIn(['repo', 'name']);
    return focusOnRepos.includes(repoNameForEvent);
  });
};

module.exports = removeEventsNotInRepos;
