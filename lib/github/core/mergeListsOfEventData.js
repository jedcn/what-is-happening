const { compareDesc } = require('date-fns');
const { List } = require('immutable');

const mergeListsOfEventData = (listOfListsOfEventData) => {
  const allEntriesMergedTogether = listOfListsOfEventData.reduce((acc, list) => {
    return acc.concat(list);
  }, List());
  return allEntriesMergedTogether.sort((userEventA, userEventB) => {
    return compareDesc(userEventA.get('created_at'), userEventB.get('created_at'));
  });
};

module.exports = mergeListsOfEventData;
