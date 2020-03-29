import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import LoginPage from './Components/LoginPage/LoginPage';
import EventsList from './Components/EventsList';
import Map from './Components/Map';
import ProfilePage from './Components/Profile';
import UpdateProfile from './Components/UpdateProfile';
import { CookiesProvider, useCookies } from 'react-cookie';

const App = () => {
    const [cookie, setCookie] = useCookies(['profile']);
    console.log(cookie);

    if (!cookie.profile || cookie.profile === 'undefined') {
        return (
            <CookiesProvider>
                <BrowserRouter>
                    <Route
                        path="/"
                        render={props => (
                            <LoginPage {...props} setCookie={setCookie} />
                        )}
                    />
                </BrowserRouter>
            </CookiesProvider>
        );
    }

    return (
        <CookiesProvider>
            <BrowserRouter>
                <Route exact path="/create-event" component={CreateEvent} />
                <Route exact path="/events" component={EventsList} />
                <Route exact path={'/events/:eventId'} component={Map} />
                <Route path="/profile/:userId" exact component={ProfilePage} />
                <Route path="/profile/:userId/edit" component={UpdateProfile} />
                <Route path="/" exact component={EventsList} />
            </BrowserRouter>
        </CookiesProvider>
    );
};

export default App;
