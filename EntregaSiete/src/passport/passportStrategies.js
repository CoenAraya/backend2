import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import UsersManager from '../Dao/UserManagerMongo.js';
import { compareData, hashData } from '../utils.js';
import {userModel} from '../db/models/user.model.js';

const usersManager = new UsersManager();

passport.use(
    'login', 
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            const userDB = email
            const pass = password
            const user = await usersManager.loginUser({ userDB, pass });
            if (!user) {
                done(null, user);
            }
            
            return done(null, false);
            
            
        }
)
)

passport.use(
    'register', 
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            console.log(password)
            const userDB = email
            const pass = password
            const user = await usersManager.loginUser({ userDB, pass });
            console.log(user)

            if (!user) {
                const hashPassword = await hashData(pass);
                const newUser = { firstName:userDB, password: hashPassword };
                const newUserDB = await usersManager.createUser(newUser);
                
                
                done(null, user);
            }
            alert('User already exists')
            return done(null, false);
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
            const user = await usersManager.loginUser({ username, password });
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


passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.2f01ed37f3d6f3fa',
    clientSecret: '97b094c902c94c9bb00210d0266ebbc77feac87c',
    callbackURL: 'http://localhost:8080/login/github'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
        const email = profile.email;
        const userDB = await userModel.findOne({ email });
        if (userDB) {
          return done(null, userDB);
        }
        console.log(profile.username)
        const newUser = {
            firstName: profile.username,
            lastName: profile.name?.split(' ')[1] || '',
            email,
        };
        const newUserDB = await userModel.create(newUser);
        done(null, newUserDB);
      } catch (e) {
        console.error(e);
        done(null, false);
      }
}

)
);



passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await usersManager.getUserById(id);
    done(null, user);
});
