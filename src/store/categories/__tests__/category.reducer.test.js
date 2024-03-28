import {
	categoriesReducer,
	CATEGORIES_INITIAL_STATE
} from '../category.reducer';
import {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailed
} from '../category.action';

describe('category reducer tests', () => {
	test('fetchCategoriesStart', () => {
		const expectedState = {
			...CATEGORIES_INITIAL_STATE,
			isLoading: true
		};

		expect(
			categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())
		).toEqual(expectedState);
	});
	test('fetchCategoriesSuccess', () => {
		const mockData = [
			{
				title: 'mens',
				imageUrl: 'test',
				items: [
					{ id: 1, name: 'Product 1', imageUrl: 'test1', price: 100 },
					{ id: 2, name: 'Product 2', imageUrl: 'test2', price: 100 }
				]
			},
			{
				title: 'womens',
				imageUrl: 'test2',
				items: [
					{ id: 3, name: 'Product 3', imageUrl: 'test3', price: 100 },
					{ id: 4, name: 'Product 4', imageUrl: 'test4', price: 100 }
				]
			}
		];
		const expectedState = {
			...CATEGORIES_INITIAL_STATE,
			isLoading: false,
			categories: mockData
		};

		expect(
			categoriesReducer(
				CATEGORIES_INITIAL_STATE,
				fetchCategoriesSuccess(mockData)
			)
		).toEqual(expectedState);
	});
	test('fetchCategoriesFailed', () => {
		const mockError = new Error('Error fetching categories');
		const expectedState = {
			...CATEGORIES_INITIAL_STATE,
			isLoading: false,
			error: mockError
		};

		expect(
			categoriesReducer(
				CATEGORIES_INITIAL_STATE,
				fetchCategoriesFailed(mockError)
			)
		).toEqual(expectedState);
	});
});
