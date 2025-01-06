import { render, screen, fireEvent } from '@testing-library/react';
import { TeamForm } from '../TeamForm';

describe('TeamForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form fields correctly', () => {
    render(<TeamForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/team name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/logo url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add team/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<TeamForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText(/team name/i);
    const logoInput = screen.getByLabelText(/logo url/i);
    
    fireEvent.change(nameInput, { target: { value: 'Test Team' } });
    fireEvent.change(logoInput, { target: { value: 'https://example.com/logo.png' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /add team/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Test Team',
      logoUrl: 'https://example.com/logo.png'
    });
  });

  it('shows error when submitting without team name', async () => {
    render(<TeamForm onSubmit={mockOnSubmit} />);
    
    fireEvent.submit(screen.getByRole('button', { name: /add team/i }));
    
    expect(await screen.findByText(/team name is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});