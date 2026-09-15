import { createApp } from 'vue';
import {
  Quasar,
  Dialog,
  Notify,
  ClosePopup,
  Ripple,
  QLayout,
  QHeader,
  QToolbar,
  QPageContainer,
  QPage,
  QDrawer,
  QList,
  QItem,
  QItemSection,
  QBtn,
  QBadge,
  QIcon,
  QCard,
  QCardSection,
  QCardActions,
  QDialog,
  QInput,
  QSelect
} from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './index.css';
import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);

app.use(Quasar, {
  components: {
    QLayout,
    QHeader,
    QToolbar,
    QPageContainer,
    QPage,
    QDrawer,
    QList,
    QItem,
    QItemSection,
    QBtn,
    QBadge,
    QIcon,
    QCard,
    QCardSection,
    QCardActions,
    QDialog,
    QInput,
    QSelect
  },
  directives: {
    ClosePopup,
    Ripple
  },
  plugins: {
    Dialog,
    Notify,
  },
  config: {
    dark: true,
    brand: {
      primary: '#F35D08',
      secondary: '#E65100',
      accent: '#FFB300',
      dark: '#0D0D0D',
      'dark-page': '#0D0D0D',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
});

app.use(router);
app.mount('#app');
