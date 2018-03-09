const BaseEvent = require('./BaseEvent');
const { hrefForRepo, hrefForBranch } = require('../core/linkUtils');

class CreateEvent extends BaseEvent {

  constructor(map, options) {
    super(map);
    this.options = options;
  }

  getCreatedItemType() {
    return this.map.getIn(['payload', 'ref_type']);
  }

  getCreatedItemName() {
    if (this.getCreatedItemType() === 'repository') {
      return this.map.getIn(['repo', 'name']);
    }
    return this.map.getIn(['payload', 'ref']);
  }

  getCreatedItemHref() {
    const { server } = this.options;
    if (this.getCreatedItemType() === 'repository') {
      return hrefForRepo(server, this.getRepo());
    }
    return hrefForBranch(server, this.getRepo(), this.getCreatedItemName());
  }

  additionalJSON() {
    return {
      createdItemHref: this.getCreatedItemHref(),
      createdItemName: this.getCreatedItemName(),
      createdItemType: this.getCreatedItemType()
    }
  }
}

module.exports = CreateEvent;
