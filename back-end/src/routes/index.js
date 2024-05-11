import { SignUpRoute } from './SignUpRoute';
import { LoginRoute } from './LoginRoute'
import { UpdateUserRoute } from './UpdateUserRoute';
import { VerifyEmail } from './VerifyEmail';
import { ForgotPassRoute } from './ForgotPassRoute';
import { ResetPasswordRoute } from './ResetPassWordRoute';
import { GetGoogleOAuthRoute } from './GetGoogleOAuthRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';

export const routes = [
    SignUpRoute,
    LoginRoute,
    UpdateUserRoute,
    VerifyEmail,
    ForgotPassRoute,
    ResetPasswordRoute,
    GetGoogleOAuthRoute,
    googleOauthCallbackRoute
];