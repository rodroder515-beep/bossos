/**
 * Member 3: Corporate Recycle Bin (bin.ts)
 * Tracks deleted/restored corporate artifacts and per-file restoration counts
 * so Session Memory can remark: "Earlier you restored 'Q3_Report' three times. Interesting."
 */

import { MoodId } from './mood';

export interface BinItem {
  id: string;
  fileName: string;
  baseName: string;
  sizeKb: number;
  status: 'in_bin' | 'restored' | 'shredded';
  restoreCount: number;
  descriptions: Record<MoodId, string>;
}

export function createInitialBinItems(): BinItem[] {
  return [
    {
      id: 'q3_report',
      fileName: 'Q3_Report.xlsx',
      baseName: 'Q3_Report',
      sizeKb: 4031,
      status: 'in_bin',
      restoreCount: 0,
      descriptions: {
        corporate: 'Master Q3 revenue adjustments & unapproved calculator rounding sheets',
        passive_aggressive: 'Someone keeps putting the Q3 numbers in the trash! Weird, right?',
        dank_2016: 'Restore this 3 times to trigger the BossOS Session Memory Easter egg',
        existential: 'A spreadsheet containing numbers that justify our continued employment',
      },
    },
    {
      id: 'ceo_bonus',
      fileName: 'CEO_Retreat_Receipts.pdf',
      baseName: 'CEO_Retreat_Receipts',
      sizeKb: 1840,
      status: 'in_bin',
      restoreCount: 0,
      descriptions: {
        corporate: 'Executive offsite invoices categorized under R&D hardware',
        passive_aggressive: 'Leadership wellness expenses (please do not forward to Accounting)',
        dank_2016: 'Golden yacht skin DLC unlocked with company card',
        existential: 'Receipts from an island none of us will ever visit',
      },
    },
    {
      id: 'intern_budget',
      fileName: 'Unpaid_Intern_Budget.csv',
      baseName: 'Unpaid_Intern_Budget',
      sizeKb: 12,
      status: 'in_bin',
      restoreCount: 0,
      descriptions: {
        corporate: 'Zero-row CSV file representing Q3 intern compensation',
        passive_aggressive: 'Paid in invaluable exposure and coffee machine privileges!',
        dank_2016: '404 Budget Not Found (0 KB of actual salary)',
        existential: 'An empty comma-separated void',
      },
    },
    {
      id: 'ethics_minutes',
      fileName: 'Ethics_Committee_Minutes.doc',
      baseName: 'Ethics_Committee_Minutes',
      sizeKb: 64,
      status: 'in_bin',
      restoreCount: 0,
      descriptions: {
        corporate: 'Meeting adjourned after 42 seconds due to lack of agenda items',
        passive_aggressive: 'We all agreed we are doing a super ethical job!',
        dank_2016: 'Short read — mostly Dank Mode border compliance notes',
        existential: 'A blank page stamped CONFIDENTIAL',
      },
    },
  ];
}

export function restoreBinItem(items: BinItem[], id: string): BinItem[] {
  return items.map((item) =>
    item.id === id
      ? {
          ...item,
          status: 'restored',
          restoreCount: item.restoreCount + 1,
        }
      : item
  );
}

export function putBackInBin(items: BinItem[], id: string): BinItem[] {
  return items.map((item) =>
    item.id === id
      ? {
          ...item,
          status: 'in_bin',
        }
      : item
  );
}

export function shredBinItem(items: BinItem[], id: string): BinItem[] {
  return items.map((item) =>
    item.id === id
      ? {
          ...item,
          status: 'shredded',
        }
      : item
  );
}

export function restoreAllBinItems(items: BinItem[]): BinItem[] {
  return items.map((item) =>
    item.status !== 'shredded'
      ? {
          ...item,
          status: 'restored',
          restoreCount: item.restoreCount + 1,
        }
      : item
  );
}
