import Broadcast from './components/Broadcast';
import Watch from './components/Watch';
import { NavLink, NavLinkRenderProps, useLocation } from 'react-router-dom';

export function App() {
    const { pathname } = useLocation();

    const getLinkClasses = (props: NavLinkRenderProps) => {
        return props.isActive ? 'underline font-semibold' : '';
    };

    return (
        <>
            <header className="flex gap-4 justify-center">
                <NavLink className={getLinkClasses} to="/broadcast">
                    Broadcast
                </NavLink>
                <NavLink className={getLinkClasses} to="/watch">
                    Watch
                </NavLink>
            </header>
            <main className="p-2">
                {pathname === '/broadcast' && <Broadcast />}
                {pathname === '/watch' && <Watch />}
            </main>
        </>
    );
}

export default App;
