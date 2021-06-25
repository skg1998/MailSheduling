import Dashboard from './pages/Dashboard';
import ComposeMail from './pages/ComposeMail'
import History from './pages/History'

const pageList = [
  {
    name: 'Dashboard',
    path: '/home',
    component: Dashboard,
  },
  {
    name: 'Compose Mail',
    path: '/compose-mail',
    component: ComposeMail,
  },
  {
    name: 'History',
    path: '/history',
    component: History,
  }
];

export default pageList;
