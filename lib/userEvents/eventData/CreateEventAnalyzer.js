const CreateEventAnalyzer = (event) => {
  const { payload } = event;
  let typeOfCreatedThing;
  let nameOfCreatedThing;
  if (payload.ref_type === 'repository') {
    typeOfCreatedThing = `a new repository`;
    nameOfCreatedThing = event.repo.name;
  } else {
    typeOfCreatedThing = `a new ${payload.ref_type}`;
    nameOfCreatedThing = payload.ref;
  }
  return {
    typeOfCreatedThing,
    nameOfCreatedThing,
  };
};

module.exports = CreateEventAnalyzer;
