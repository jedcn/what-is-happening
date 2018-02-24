
const removeRefsHeads = (ref) => ref.substring('refs/heads/'.length);

const PushEventAnalyzer = (event) => {
  return {
    branch: removeRefsHeads(event.payload.ref)
  };
};

module.exports = PushEventAnalyzer;
