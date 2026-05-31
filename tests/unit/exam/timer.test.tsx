import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Timer } from '@/components/exam/Timer';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

describe('Timer', () => {
  it('counts down each second', () => {
    render(<Timer remainingSec={65} onExpire={() => {}} />);
    expect(screen.getByText('01:05')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('01:04')).toBeTruthy();
  });
  it('calls onExpire at zero', () => {
    const onExpire = vi.fn();
    render(<Timer remainingSec={1} onExpire={onExpire} />);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(onExpire).toHaveBeenCalled();
  });
});
