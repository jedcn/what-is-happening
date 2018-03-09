const describeTime = require('../describeTime');

class BaseEvent {

  constructor(map) {
    this.map = map;
  }

  getActor() {
    return this.map.getIn(['actor', 'login']);
  }

  getEventType() {
    return this.map.get('type');
  }

  getCreatedAt() {
    return describeTime(this.map.get('created_at'));
  }

  getRepo() {
    return this.map.getIn(['repo', 'name']);
  }

  additionalJSON() {
    return {}
  }

  toJSON() {
    const base = {
      actor: this.getActor(),
      createdAt: this.getCreatedAt(),
      eventType: this.getEventType(),
      repo: this.getRepo(),
    };
    return Object.assign(base, this.additionalJSON());
  }
}

module.exports = BaseEvent;
