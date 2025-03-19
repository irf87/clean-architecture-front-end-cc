import { render, screen } from '../test/test-utils';

describe('Example Test', () => {
  it('renders without crashing', () => {
    render(<div>Test Component</div>);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
}); 