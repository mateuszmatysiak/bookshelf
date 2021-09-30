import {formatDate} from 'utils/misc'

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('November 22, 1996'))).toBe('Nov 96')
})
