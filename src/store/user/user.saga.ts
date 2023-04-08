import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './user.types';
import {
    signUpSucceeded,
    EmailSignInStart,
    SignUpStarted,
    SignUpSucceeded
} from './user.action';
import { User } from 'firebase/auth';
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from '../../utils/firebase/firebase.utils';
import { signInSuccess, signOutSucceeded, userFailed } from './user.reducer';

function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        const errorMessage = error && (({ message }) => ({ message }))(error as Error);
        yield* put(userFailed(errorMessage));
    }
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        const errorMessage = error && (({ message }) => ({ message }))(error as Error);
        yield* put(userFailed(errorMessage));
    }
}

function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        const errorMessage = error && (({ message }) => ({ message }))(error as Error);
        yield* put(userFailed(errorMessage));
    }
}

function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        const errorMessage = error && (({ message }) => ({ message }))(error as Error);
        yield* put(userFailed(errorMessage));
    }
}

function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* signUp({ payload: { email, password, displayName } }: SignUpStarted) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* put(signUpSucceeded(user, { displayName }));
        }
    } catch (error) {
        const errorMessage = error && (({ message }) => ({ message }))(error as Error);
        yield* put(userFailed(errorMessage));
    }
}

function* onSignUpStarted() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_STARTED, signUp);
}

function* signInAfterSignUp({ payload: { user, aditionalDetails } }: SignUpSucceeded) {
    yield* call(getSnapshotFromUserAuth, user, aditionalDetails);
}

function* onSignUpSucceeded() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCEEDED, signInAfterSignUp);
}

function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSucceeded());
    } catch (error) {
        const errorMessage = error && (({ message }) => ({ message }))(error as Error);
        yield* put(userFailed(errorMessage));
    }
}

function* onSignOutStarted() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_STARTED, signOut);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStarted),
        call(onSignUpSucceeded),
        call(onSignOutStarted),
    ]);
}