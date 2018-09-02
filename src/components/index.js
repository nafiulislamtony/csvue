import Vue from 'vue';
import DownloadCSV from './csvue';

const Components = {
  DownloadCSV
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
