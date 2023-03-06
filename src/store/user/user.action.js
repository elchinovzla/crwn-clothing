import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOGLE_SIGN_IN_START);
export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
export const signUpStarted = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_STARTED, { email, password, displayName });
export const signUpSucceeded = (user, aditionalDetails) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCEEDED, { user, aditionalDetails });
export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);