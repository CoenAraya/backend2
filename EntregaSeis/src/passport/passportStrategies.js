import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import UsersManager from '../Dao/UserManagerMongo.js';

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passReqToCallback: true

}, async (username, password, done) => {
    const user = await UsersManager.loginUser({ username, password });
    if (user) {
        return done(null, false, { message: 'Welcome' });
    }
    const hashPassword = await hashData(password);
    const newUser = { ...req.body, password: hashPassword };
    const newUserDB = await UsersManager.createUser(newUser);
    return done(null, newUserDB);


}
)
)

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'username',
        },
        async (username, password, done) => {
            const user = await UsersManager.loginUser({ username, password });
            if (user) {
                return done(null, user);
            }
            const isPasswordValid = await compareData(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
    )

)


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UsersManager.getUserById(id);
    done(null, user);
});

passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.2f01ed37f3d6f3fa',
    clientSecret: '97b094c902c94c9bb00210d0266ebbc77feac87c',
    callbackURL: 'http://localhost:8080/login/github'
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    done (null, false)
}

)
);