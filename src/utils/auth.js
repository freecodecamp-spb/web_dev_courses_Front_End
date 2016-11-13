import AuthService from './AuthService';

export * from './AuthService';

// Hack way, context didn't work yet
export const auth = new AuthService('aKg3mCHL991U9hrkC6kugeFeRuh8ux9F', 'alexbaumgertner.auth0.com');

// validate authentication for private routes
export const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({pathname: '/login'})
  }
};
