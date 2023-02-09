import './App.css';

import { 
  PageFooter,
  PageHeader,
  PageRouting
} from './components/Page';
import { UserProvider } from './views/users/useUsers';

function App() {
  return (
    <div>
      <PageHeader />
      <UserProvider>
        <PageRouting />
      </UserProvider>
      <PageFooter />
    </div>
  );
}

export default App;
