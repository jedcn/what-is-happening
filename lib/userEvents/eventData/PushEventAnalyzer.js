
const removeRefsHeads = (ref) => ref.substring('refs/heads/'.length);

const PushEventAnalyzer = (event) => {
  const { payload } = event;
  return {
    branch: removeRefsHeads(event.payload.ref),
    commitCount: `${payload.size} commit${payload.size === 1 ? '' : 's'}`
  };
};

module.exports = PushEventAnalyzer;
