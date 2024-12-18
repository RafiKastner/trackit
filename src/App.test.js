import { render, screen } from '@testing-library/react';
import App from './App';
import { loremIpsum } from 'lorem-ipsum'
import { randomIntFromInterval } from './scripts/generics';

test('Checks that sidebar cards render text correctly', () => {
	var mockData = []
	const lorem = []
	for (let i = 0; i < 20; i++) {
		lorem.push(loremIpsum({
			count: randomIntFromInterval(1, 10),
			units: 'words',
			format: 'plain'
		}))
	}
	for (let i = 0; i < lorem.length; i+=2) {
		mockData.push({
			id: i / 2,
			title: lorem[i],
			description: lorem[i+1],
		})
	}
	render(<App data={mockData}/>);
	for (let i = 0; i < lorem.length; i++) {
		const linkElement = screen.getByText(lorem[i]);
		expect(linkElement).toBeInTheDocument();
	}
});