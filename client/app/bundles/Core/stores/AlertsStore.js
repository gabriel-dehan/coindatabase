import {observable, action, computed} from 'mobx';
import _ from 'lodash';


class AlertsStore {
  @observable alerts = [];

  set = (alert) => {
    this.clear();
    this.alerts.push(alert);
  };
  clear = () => {
    this.alerts = [];
  };

  @computed get type() {
    return this.alerts[0].type;
  };

  @computed get hasAlerts() {
    return this.alerts.length > 0;
  };

  @computed get success() {
    return _.filter(this.alerts, (alert) => alert.type == 'success')[0];
  };

  @computed get error() {
    return _.filter(this.alerts, (alert) => alert.type == 'error')[0];
  };

};

const Store = new AlertsStore();
export default Store;

