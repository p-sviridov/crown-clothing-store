import { screen, fireEvent } from '@testing-library/react';
import Category from './category.component';
import { renderWithProviders } from '../../utils/test/test.utils';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		category: 'mens'
	})
}));

describe('category tests', () => {
	test('it should render a Spinner if isLoading is true', () => {
		renderWithProviders(<Category />, {
			preloadedState: {
				categories: {
					isLoading: true,
					categories: []
				}
			}
		});

		const spinnerElement = screen.getByTestId('spinner');
		expect(spinnerElement).toBeInTheDocument();
	});

	test('it should render products if isLoading is false', () => {
		renderWithProviders(<Category />, {
			preloadedState: {
				categories: {
					isLoading: false,
					categories: [
						{
							title: 'mens',
							items: [
								{ id: 1, name: 'Product 1' },
								{ id: 2, name: 'Product 2' }
							]
						}
					]
				}
			}
		});

		const spinnerElement = screen.queryByTestId('spinner');
		expect(spinnerElement).toBeNull();

		const product1Element = screen.getByText(/Product 1/i);
		expect(product1Element).toBeInTheDocument();
		const product2Element = screen.getByText(/Product 2/i);
		expect(product2Element).toBeInTheDocument();
	});
});
