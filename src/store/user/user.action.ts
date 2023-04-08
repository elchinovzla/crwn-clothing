import { USER_ACTION_TYPES } from "./user.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { UserData, AdditionalInformation } from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>
export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOGLE_SIGN_IN_START>
export const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOGLE_SIGN_IN_START));

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string }>
export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export type SignUpStarted = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_STARTED, { email: string, password: string, displayName: string }>
export const signUpStarted = withMatcher((email: string, password: string, displayName: string): SignUpStarted => createAction(USER_ACTION_TYPES.SIGN_UP_STARTED, { email, password, displayName, }));

export type SignUpSucceeded = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCEEDED, { user: User, aditionalDetails: AdditionalInformation }>
export const signUpSucceeded = withMatcher((user: User, aditionalDetails: AdditionalInformation): SignUpSucceeded => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCEEDED, { user, aditionalDetails }));

export type SignOutStarted = Action<USER_ACTION_TYPES.SIGN_OUT_STARTED>
export const signOutStarted = withMatcher((): SignOutStarted => createAction(USER_ACTION_TYPES.SIGN_OUT_STARTED));