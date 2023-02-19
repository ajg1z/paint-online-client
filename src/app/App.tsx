import { AppRouter } from './providers/router';
import './styles//index.scss';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
    return (
        <div className='app'>
            <AppRouter />
        </div>
    );
});
