import {
	selectCategories,
	selectCategoriesIsLoading,
	selectCategoriesMap
} from '../category.selector';

const mockState = {
	categories: {
		isLoading: false,
		categories: [
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
		]
	}
};

describe('Category Selector tests', () => {
	test('selectCategories should return the categories data', () => {
		const categoriesSlice = selectCategories(mockState);
		expect(categoriesSlice).toEqual(mockState.categories.categories);
	});

	test('selectCategoriesIsLoading should return isLoading state', () => {
		const isLoading = selectCategoriesIsLoading(mockState);
		expect(isLoading).toEqual(false);
	});

	test('selectCategoriesMap should convert the items array into appropriate categories map', () => {
		const expectedCategoriesMap = {
			mens: [
				{ id: 1, name: 'Product 1', imageUrl: 'test1', price: 100 },
				{ id: 2, name: 'Product 2', imageUrl: 'test2', price: 100 }
			],
			womens: [
				{ id: 3, name: 'Product 3', imageUrl: 'test3', price: 100 },
				{ id: 4, name: 'Product 4', imageUrl: 'test4', price: 100 }
			]
		};

		const categoriesMap = selectCategoriesMap(mockState);
		expect(categoriesMap).toEqual(expectedCategoriesMap);
	});
});
