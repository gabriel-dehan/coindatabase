import {observable, action, computed} from 'mobx';
import AlertsStore from '../stores/AlertsStore';

const Actions = {
  setAlert: action(function(alert) {
    console.log(alert);
    AlertsStore.set(alert);
  }),
  clearAlerts: action(function() {
    AlertsStore.clear();
  })
};

export default Actions;
