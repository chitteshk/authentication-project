import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PrivateRoute } from './auth/PrivateRoute';
import { PleaseVerifyEmail } from './pages/PleaseVerifyEmail';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import { ForgotPassword } from './pages/ForgotPassword';
import { ReserPasswordLandingPage } from './pages/ResetPassWordLandingPage';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>\
                <Route path="/signup" exact>
                    <SignupPage />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPassword/>
                </Route>
                <Route path='/please-verify'>
                    <PleaseVerifyEmail/>
                </Route>
                <Route path="/verify-email/:verificationString">
                    <EmailVerificationLandingPage/>
                </Route>
                <Route path="/reset-password/:resetPasswordString">
                    <ReserPasswordLandingPage/>
                </Route>

            </Switch>
        </Router>
    );
}