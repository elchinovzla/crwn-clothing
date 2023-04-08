import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStart, fetchCategoriesSucceded, fetchCategoriesFailed } from './category.reducer';

export function* fetchCategoriesAsync() {
    try {
        const categories = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSucceded(categories));
    } catch (error) {
        const errorMessage = error && (({ message }) => ({ message }))(error as Error);
        yield* put(fetchCategoriesFailed(errorMessage));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(
        fetchCategoriesStart,
        fetchCategoriesAsync
    );
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);// run everything inside and wait until it's done
}