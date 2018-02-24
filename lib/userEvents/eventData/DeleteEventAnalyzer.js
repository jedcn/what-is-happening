const DeleteEventAnalyzer = (event) => {
  const { payload } = event;
  const { ref, ref_type } = payload;
  return {
    ref,
    ref_type
  };
};

module.exports = DeleteEventAnalyzer;
