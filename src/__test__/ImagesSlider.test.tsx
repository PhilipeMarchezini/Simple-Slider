import { render, screen } from '@testing-library/react';
import { ImagesSlider } from '../ImagesSlider';
import '@testing-library/jest-dom';

test('', async () => {
  render(<ImagesSlider />);

  const imgList = await screen.findAllByRole('img');

  expect(imgList).toBeInTheDocument();
});
