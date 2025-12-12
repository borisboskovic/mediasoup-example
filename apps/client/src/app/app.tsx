import Broadcast from './components/Broadcast';
import Watch from './components/Watch';
import { ChangeEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const someFunc: ChangeEventHandler<HTMLInputElement> = (event) => {
        navigate(event.target.value);
    };

    return (
        <>
            <header className="flex gap-1 justify-center">
                <label className="cursor-pointer" htmlFor="broadcast">
                    Broadcast
                </label>
                <input
                    type="radio"
                    id="broadcast"
                    name="role-select"
                    value="broadcast"
                    onChange={someFunc}
                    className="cursor-pointer"
                    defaultChecked={pathname === '/broadcast'}
                />
                <div className="w-1"></div>
                <input
                    type="radio"
                    id="watch"
                    name="role-select"
                    value="watch"
                    onChange={someFunc}
                    className="cursor-pointer"
                    defaultChecked={pathname === '/watch'}
                />
                <label className="cursor-pointer" htmlFor="watch">
                    Watch
                </label>
            </header>
            <main className="p-2">
                {pathname === '/broadcast' && <Broadcast />}
                {pathname === '/watch' && <Watch />}
            </main>
        </>
    );
}

export default App;
