const describeTime = require('../core/describeTime');

class BaseEvent {

  constructor(map, config) {
    this.map = map;
    this.config = config;
  }

  getActor() {
    return this.map.getIn(['actor', 'login']);
  }

  getEventType() {
    return this.map.get('type');
  }

  getCreatedAt() {
    return this.map.get('created_at');
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
      createdAtDescription: describeTime(this.getCreatedAt()),
      eventType: this.getEventType(),
      repo: this.getRepo(),
    };
    return Object.assign(base, this.additionalJSON());
  }
}

module.exports = BaseEvent;
