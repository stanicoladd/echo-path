import { useHashRoute } from './router/useHashRoute.js';
import { useProfile } from './state/useProfile.js';
import { Landing } from './pages/Landing.jsx';
import { ProfileSelection } from './pages/ProfileSelection.jsx';
import { Institutions } from './pages/Institutions.jsx';
import { InstitutionDetail } from './pages/InstitutionDetail.jsx';
import { AccessibleMode } from './pages/AccessibleMode.jsx';
import { InstitutionHome } from './pages/institution/InstitutionHome.jsx';
import { AulaSpace } from './pages/institution/AulaSpace.jsx';

function App() {
  const path = useHashRoute();
  const { profileId, selectProfile } = useProfile();

  function renderRoute() {
    if (path === '/profile') {
      return <ProfileSelection profileId={profileId} onSelect={selectProfile} />;
    }
    if (path === '/institutions') {
      return <Institutions profileId={profileId} />;
    }
    if (path.startsWith('/institution/')) {
      return <InstitutionDetail profileId={profileId} />;
    }
    if (path === '/aula') {
      return <AccessibleMode profileId={profileId} onSelect={selectProfile} />;
    }
    if (path === '/portal/aula') {
      return <AulaSpace />;
    }
    if (path === '/portal') {
      return <InstitutionHome />;
    }
    return <Landing />;
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {renderRoute()}
    </div>
  );
}

export default App;
