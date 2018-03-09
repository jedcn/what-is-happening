const BaseEvent = require('./BaseEvent');

class DeleteEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getDeletedItemType() {
    return this.map.getIn(['payload', 'ref_type']);
  }

  getDeletedItemName() {
    if (this.getDeletedItemType() === 'repository') {
      return this.map.getIn(['repo', 'name']);
    }
    return this.map.getIn(['payload', 'ref']);
  }

  additionalJSON() {
    return {
      deletedItemName: this.getDeletedItemName(),
      deletedItemType: this.getDeletedItemType()
    }
  }
}

module.exports = DeleteEvent;
